package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.FavoritesRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.Favorites;
import com.example.Chaptr.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FavoritesController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    FavoritesRepository favoritesRepository;

    @GetMapping("/favorites")
    public List<Favorites> getAllFavorites(){
        return (List<Favorites>) favoritesRepository.findAll();
    }

    @GetMapping("/favorites/email/{email}")
    public ResponseEntity<?> getUserFavorites(@PathVariable String email){
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()){
            User user = userOptional.get();
            Optional<Favorites> existingFavorites = favoritesRepository.findByUser(user);

            if (existingFavorites.isPresent()){
                return ResponseEntity.ok(existingFavorites.get());
            } else {
                Favorites newFavorites = new Favorites();
                newFavorites.setUser(user);
                String favoritesName = user.getName() + "'s Favorites List";
                newFavorites.setName(favoritesName);
                favoritesRepository.save(newFavorites);
                user.setFavoritesList(newFavorites);
                userRepository.save(user);

                return ResponseEntity.status(HttpStatus.CREATED).body(newFavorites);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @Transactional
    @PostMapping("/newFavorites/email/{email}")
    public ResponseEntity<?> newFavorites(@PathVariable String email, @RequestParam Integer bookId) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            Optional<Favorites> existingFavorites = favoritesRepository.findByUser(user);

            if (existingFavorites.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already has a Favorites List");
            }
            Favorites userFavorites = new Favorites();
            userFavorites.setUser(user);
            String favoritesName = user.getName() + "'s Favorites List";
            userFavorites.setName(favoritesName);
            Optional<Book> existingBook = bookRepository.findById(bookId);

            if (existingBook.isPresent()) {
                Book book = existingBook.get();
                userFavorites.addToFavoritesList(book);
                favoritesRepository.save(userFavorites);
                user.setFavoritesList(userFavorites);
                userRepository.save(user);
                return ResponseEntity.ok(userFavorites);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this email does not exist.");
        }
    }

    @Transactional
    @PutMapping("/favorites/{email}")
    public ResponseEntity<?> updateUserFavorites(@RequestBody Book newBook, @PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " does not exist.");
        }
        User user = userOptional.get();
        Optional<Favorites> existingFavoritesOptional = favoritesRepository.findByUser(user);
        Favorites existingFavorites;

        if (existingFavoritesOptional.isPresent()) {
            existingFavorites = existingFavoritesOptional.get();
        } else {
            existingFavorites = new Favorites();
            existingFavorites.setName(user.getName() + "'s Favorites List");
            existingFavorites.setUser(user);
        }
        Optional<Book> existingBookOptional = bookRepository.findById(newBook.getId());

        if (!existingBookOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Book with ID " + newBook.getId() + " not found.");
        }
        Book existingBook = existingBookOptional.get();

        if (existingFavorites.getFavoritesList().contains(existingBook)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book '" + existingBook.getName() + "' is already in your Favorites List.");
        }
        existingFavorites.addToFavoritesList(existingBook);
        favoritesRepository.save(existingFavorites);
        user.setFavoritesList(existingFavorites);
        userRepository.save(user);

        return ResponseEntity.ok(existingFavorites);
    }

    @Transactional
    @DeleteMapping("/deleteBookFromFavorites/{email}/{bookId}")
    public ResponseEntity<?> removeBookFromFavorites(@PathVariable("email") String email, @PathVariable("bookId") Integer bookId) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        }
        User user = userOptional.get();
        Optional<Favorites> favoritesOptional = favoritesRepository.findByUser(user);

        if (!favoritesOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorites list for user not found.");
        }

        Favorites userFavorites = favoritesOptional.get();
        Optional<Book> bookOptional = bookRepository.findById(bookId);

        if (!bookOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found.");
        }
        Book bookToRemove = bookOptional.get();
        userFavorites.removeFromFavoritesList(bookToRemove);
        favoritesRepository.save(userFavorites);
        bookRepository.delete(bookToRemove);
        return ResponseEntity.ok("Book removed successfully.");
    }

    @Transactional
    @DeleteMapping("/deleteFavorites/{id}")
    public ResponseEntity<?> deleteUserFavorites(@PathVariable("id") Integer id) {
        Optional<Favorites> favoritesOptional = favoritesRepository.findById(id);

        if (favoritesOptional.isPresent()) {
            Favorites favorites = favoritesOptional.get();
            User user = favorites.getUser();

            if (user != null) {
                user.setFavoritesList(null); // Remove the reference from the user
                userRepository.save(user);
            }
            favoritesRepository.deleteById(id); // Delete the favorites list
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorites List not found.");
        }
    }
}