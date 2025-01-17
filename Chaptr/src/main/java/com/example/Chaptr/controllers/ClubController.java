package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.ClubRepository;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("club")
public class ClubController {



    @Autowired
    private ClubRepository clubRepository;


    private BookRepository bookRepository;

    @GetMapping
    public List<Club> displayAllClubs(){
        return (List<Club>) clubRepository.findAll();
    }

    @GetMapping("/{clubId}")
    public Club displayClub(@PathVariable int clubId){

        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
        }
        return club;
    }

    @PostMapping("/create")
    public void createClub(@RequestBody Club newClub){
        clubRepository.save(newClub);
    }

    @PostMapping("{clubId}/book")

    public void updateBOTM(@PathVariable int clubId, Book newBook){
        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
            club.setBookOfTheMonth(newBook);
        }
    }

    @PostMapping("{clubId}/description")
    public void updateDescription(@PathVariable Integer clubId, @RequestBody String newDescription){
        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
            club.setClubMessage(newDescription);
        }
    }
}
