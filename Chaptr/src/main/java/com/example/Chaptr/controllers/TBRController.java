package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.TBRRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.TBR;
import com.example.Chaptr.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class TBRController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TBRRepository tbrRepository;

    @Autowired
    BookRepository bookRepository;

    @GetMapping("/tbrs")
    public List<TBR> getAllTBRs() {
        return (List<TBR>) tbrRepository.findAll();
    }

    @GetMapping("/tbr/email/{email}")
    public ResponseEntity<?> getUserTBR(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Optional<TBR> existingTBR = tbrRepository.findByUser(user);

            if (existingTBR.isPresent()) {
                return ResponseEntity.ok(existingTBR.get());
            } else {
                TBR newTBR = new TBR();
                newTBR.setUser(user);
                tbrRepository.save(newTBR);

                return ResponseEntity.status(HttpStatus.CREATED).body(newTBR);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/newTbr/email/{email}")
    public ResponseEntity<?> newTBR(@PathVariable String email, @RequestParam Integer bookId) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            Optional<TBR> existingTBR = tbrRepository.findByUser(user);
            if (existingTBR.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("User already has a TBR list.");
            }

            TBR userTBR = new TBR();
            userTBR.setUser(user);
            user.setTbr(userTBR);

            if (userTBR.getName() == null || userTBR.getName().isEmpty()) {
                userTBR.setName(user.getName() + "'s TBR List");
            }

            Optional<Book> existingBook = bookRepository.findById(bookId);
            if (existingBook.isPresent()) {
                Book book = existingBook.get();
                userTBR.addToTBR(book);

                TBR updatedTBR = tbrRepository.save(userTBR);
                return ResponseEntity.ok(updatedTBR);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with this email does not exist.");
        }
    }

    @PutMapping("/tbr/{email}")
    public ResponseEntity<?> updateUserTBR(@RequestBody Book newBook, @PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Optional<TBR> existingTBROptional = tbrRepository.findByUser(user);

            if (existingTBROptional.isPresent()) {
                TBR existingTBR = existingTBROptional.get();

                Optional<Book> existingBook = bookRepository.findById(newBook.getId());
                if (existingBook.isPresent()) {
                    Book book = existingBook.get();
                    existingTBR.addToTBR(book);

                    TBR updatedTBR = tbrRepository.save(existingTBR);
                    return ResponseEntity.ok(updatedTBR);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Book not found.");
                }
            } else {
                TBR newTBR = new TBR();
                newTBR.setUser(user);

                Optional<Book> bookOptional = bookRepository.findById(newBook.getId());
                if (bookOptional.isPresent()) {
                    Book book = bookOptional.get();
                    newTBR.addToTBR(book);

                    TBR savedTBR = tbrRepository.save(newTBR);
                    return ResponseEntity.ok(savedTBR);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Book not found.");
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with this email does not exist.");
        }
    }

    @DeleteMapping("/tbr/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        Optional<TBR> tbrOptional = tbrRepository.findById(id);

        if (tbrOptional.isPresent()) {
            TBR tbr = tbrOptional.get();
            User user = tbr.getUser();

            if (user != null) {
                user.setTbr(null);
                userRepository.save(user);
            }
            tbrRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("TBR not found.");
        }
    }
}