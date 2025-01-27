package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.FavoritesRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.Favorites;
import com.example.Chaptr.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpOutputMessage;
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

    //Lets get all of the favorites lists
    @GetMapping("/favorites")
    public List<Favorites> getAllFavorites(){
        return (List<Favorites>) favoritesRepository.findAll();
    }

    //Lets see if a favorites list exists for our user
    @GetMapping("/favorites/email/{email}")
    public ResponseEntity<?> getUserFavorites(@PathVariable String email){
        //Lets see if the user exists
        Optional<User> userOptional = userRepository.findByEmail(email);
        //If it does, let's see if it has a Favorites list
        if (userOptional.isPresent()){
            User user = userOptional.get();
            Optional<Favorites> existingFavorites = favoritesRepository.findByUser(user);
            //If it exists, go get it
            if (existingFavorites.isPresent()){
                return ResponseEntity.ok(existingFavorites.get());
            } else { //otherwise, create a new one
                Favorites newFavorites = new Favorites();
                newFavorites.setUser(user); //assign it to the user
                String favoritesName = user.getName() + "'s Favorites List";
                newFavorites.setName(favoritesName); //add give the list a name. which shows up... Where?
                favoritesRepository.save(newFavorites); //save the list to the repository
                user.setFavoritesList(newFavorites);
                userRepository.save(user);//save the user with the favorites list added

                return ResponseEntity.status(HttpStatus.CREATED).body(newFavorites); //Not sure.
            }
        } else { //tell ___ that the user is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    } //end of getmapping getUserFavorites

    @Transactional //lets create a new favorites list if user does not have one
    @PostMapping("/newFavorites/email/{email}")
    public ResponseEntity<?> newFavorites(@PathVariable String email, @RequestParam Integer bookId) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) { //if the user exists, does their favorites list?
            User user = existingUser.get();
            Optional<Favorites> existingFavorites = favoritesRepository.findByUser(user);

            if(existingFavorites.isPresent()) { //they exist and a favorites list does
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already has a Favorites List");
            } // if not, we are creating a new Favorites object
            Favorites userFavorites = new Favorites();
            userFavorites.setUser(user); //add the favorites to the user
            String favoritesName = user.getName() + "'s Favorites List";
            userFavorites.setName(favoritesName); //give it a name
            //Lets see about adding books
            Optional<Book> existingBook = bookRepository.findById(bookId);

            if (existingBook.isPresent()) { //if the book exists, add it. save it to Favorites repo, the list, and the user
                Book book = existingBook.get();
                userFavorites.addToFavoritesList(book); //LIST because everything else is LIST
                favoritesRepository.save(userFavorites);
                user.setFavoritesList(userFavorites);
                userRepository.save(user);
                return ResponseEntity.ok(userFavorites);
            } else { //if the book is not in the repository, give an error message
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found.");
            }
        } else { //if the user is not present, let them know!
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this email does not exist.");
        }
    } //end of Post Mapping to create a new Favorites list

    @Transactional
    @DeleteMapping("/favorites/{email}/book/{bookId}")
    public ResponseEntity<?> removeBookFromFavorites(@PathVariable("email") String email, @PathVariable("BookId") Integer bookId) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        // if the User does not exist, give an error
        if(!userOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        }
        //Otherwise go get the user
        User user = userOptional.get();
        Optional<Favorites> favoritesOptional = favoritesRepository.findByUser(user);
        //look for the favorites list. If not found, error
        if (!favoritesOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorites list for user not found.");
        }
        //if it exists, lets look for the book
        Favorites userFavorites = favoritesOptional.get();
        Optional<Book> bookOptional = bookRepository.findById((bookId));
        //if it doesn't exist, give an error
        if (!bookOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found.");
        }
        //if it does, lets remove it
        Book bookToRemove = bookOptional.get();

        userFavorites.removeFromFavoritesList(bookToRemove);
        favoritesRepository.save(userFavorites);
        bookRepository.delete(bookToRemove);
        return ResponseEntity.ok("Book removed successfully.");
    }

} //end of favorite controller
