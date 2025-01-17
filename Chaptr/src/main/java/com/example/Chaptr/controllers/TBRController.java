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

    @PostMapping("/tbr")
    public ResponseEntity<?> newTBR(@RequestBody TBR userTBR, @RequestParam String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            userTBR.setUser(user);
            user.setTbr(userTBR);

            if (userTBR.getName() == null || userTBR.getName().isEmpty()) {
                userTBR.setName(user.getName() + "'s TBR List");
            }

            if (userTBR.getTbr() != null) {
                for (Book book : userTBR.getTbr()) {
                    Optional<Book> existingBook = bookRepository.findById(book.getId());

                    if (existingBook.isPresent()) {
                        Book b = existingBook.get();
                        book.setName(b.getName());
                        book.setBookCover(b.getBookCover());
                        book.setAuthor(b.getAuthor());
                        book.setPublicationDate(b.getPublicationDate());

                        userTBR.addToTBR(book);
                    }
                }
            }

            TBR savedTBR = tbrRepository.save(userTBR);

            return ResponseEntity.ok(savedTBR);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with this email does not exist.");
        }
    }

    @PutMapping("/tbr/{email}")
    public ResponseEntity<?> updateUserTBR(@RequestBody TBR newTBR, @PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Optional<TBR> existingTBROptional = tbrRepository.findByUser(user);

            if (existingTBROptional.isPresent()) {
                TBR existingTBR = existingTBROptional.get();
                existingTBR.setTbr(newTBR.getTbr());

                for (Book book : newTBR.getTbr()) {
                    bookRepository.findById(book.getId()).ifPresent(existingTBR::addToTBR);
                }

                TBR savedTBR = tbrRepository.save(existingTBR);

                return ResponseEntity.ok(savedTBR);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("TBR not found for user.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with this email does not exist.");
        }
    }

    @GetMapping("/tbr/email/{email}")
    public ResponseEntity<?> getTBRByUserEmail(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<TBR> tbrOptional = tbrRepository.findByUser(user);

            if (tbrOptional.isPresent()) {
                return ResponseEntity.ok(tbrOptional.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("TBR list not found for this user.");
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
