package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.FavoritesRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Favorites;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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


}
