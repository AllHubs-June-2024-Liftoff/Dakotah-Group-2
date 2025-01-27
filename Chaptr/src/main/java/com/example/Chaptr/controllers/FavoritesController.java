package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.FavoritesRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Favorites;
import com.example.Chaptr.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
                user.setFavorites(newFavorites);
                userRepository.save(user);//save the user with the favorites list added

                return ResponseEntity.status(HttpStatus.CREATED).body(newFavorites); //Not sure.
            }
        } else { //tell ___ that the user is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    } //end of getmapping getUserFavorites


}
