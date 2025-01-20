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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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
                String tbrName = user.getName() + "'s TBR List";
                newTBR.setName(tbrName);
                tbrRepository.save(newTBR);

                return ResponseEntity.status(HttpStatus.CREATED).body(newTBR);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @Transactional
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
            String tbrName = user.getName() + "'s TBR List";
            userTBR.setName(tbrName);

            Optional<Book> existingBook = bookRepository.findById(bookId);
            if (existingBook.isPresent()) {
                Book book = existingBook.get();
                userTBR.addToTBR(book);
                tbrRepository.save(userTBR);
                user.setTbr(userTBR);
                userRepository.save(user);
                return ResponseEntity.ok(userTBR);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with this email does not exist.");
        }
    }

    @Transactional
    @PutMapping("/tbr/{email}")
    public ResponseEntity<?> updateUserTBR(@RequestBody Book newBook, @PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with email " + email + " does not exist.");
        }
        User user = userOptional.get();

        Optional<TBR> existingTBROptional = tbrRepository.findByUser(user);

        TBR existingTBR;
        if (existingTBROptional.isPresent()) {
            existingTBR = existingTBROptional.get();
        } else {
            existingTBR = new TBR();
            existingTBR.setName(user.getName() + "'s TBR List");
            existingTBR.setUser(user);
        }

        Optional<Book> existingBookOptional = bookRepository.findById(newBook.getId());

        if (!existingBookOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Book with ID " + newBook.getId() + " not found.");
        }
        Book existingBook = existingBookOptional.get();

        if (existingTBR.getTbr().contains(existingBook)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Book '" + existingBook.getName() + "' is already in the TBR list.");
        }
        existingTBR.addToTBR(existingBook);
        tbrRepository.save(existingTBR);
        user.setTbr(existingTBR);
        userRepository.save(user);
        return ResponseEntity.ok(existingTBR);
    }

    @DeleteMapping("/tbr/{id}")
    public ResponseEntity<?> deleteUserTBR(@PathVariable("id") Integer id) {
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