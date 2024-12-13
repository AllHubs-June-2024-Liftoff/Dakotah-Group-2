package com.example.Chaptr.controllers;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ImageService imageService;

    private static final String userSessionKey = "user";

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User getUserFromSession(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    public Integer getUserIdFromSession(HttpSession session) {
        User user = getUserFromSession(session);
        return (user != null) ? user.getId() : null;
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        if (users == null) {
            return new ArrayList<>();  // Return an empty list if null
        }
        return users;
    }

    @PostMapping("/register")
    User newUser(@Valid @RequestBody User newUser, HttpServletRequest request) {
        newUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
        newUser.setName(newUser.getFirstName(), newUser.getLastName());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);
        return newUser;
    }

    @PutMapping("/user/{id}")
    public User updateUser(@Valid @RequestBody User newUser,
                           @PathVariable int id) {

        Optional<User> optUser = userRepository.findById(id);

        User existingUser = null;
        if (optUser.isPresent()) {
            existingUser = optUser.get();

            existingUser.setFirstName(newUser.getFirstName());
            existingUser.setLastName(newUser.getLastName());
            existingUser.setName(newUser.getFirstName(), newUser.getLastName());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setLocation(newUser.getLocation());

            if (newUser.getPwHash() != null && !newUser.getPwHash().equals(existingUser.getPwHash())) {
                existingUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
            }
        }
        return userRepository.save(existingUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser, HttpServletRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(loginUser.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            HttpSession session = request.getSession(true);
            session.setAttribute("user", user);
            System.out.println("Session ID on login: " + session.getId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        request.getSession().invalidate();
        System.out.println("Session invalidated");
    }

    @GetMapping("/checkLogin")
    public ResponseEntity<Map<String, Boolean>> checkLoginStatus(HttpSession session) {
        User user = getUserFromSession(session);  // your existing session handling logic

        // Return the login status in the response
        Map<String, Boolean> response = new HashMap<>();
        response.put("loggedIn", user != null);

        return ResponseEntity.ok(response);
    }
}
    /* @PostMapping("/editUser")
    public ResponseEntity<?> addUser(@Valid @RequestBody User newUser,
                                     @RequestParam("file") MultipartFile file,
                                     @RequestParam("fileName") String fileName) {
        try {
            Image tempImage = new Image();
            tempImage = imageService.saveImage(tempImage, fileName, file);

            newUser.setUserImage(tempImage);
            userRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error uploading image: " + e.getMessage());
        }
    } */

