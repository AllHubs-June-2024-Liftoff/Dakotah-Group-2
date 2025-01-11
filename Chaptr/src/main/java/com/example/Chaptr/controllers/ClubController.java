package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.ClubRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.Club;
import com.example.Chaptr.models.User;
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

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("{clubId}/getMembers")
    public List<User> getMembers(@PathVariable Integer clubId){
        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
        }

        return club.getMembers();
    }

    @PostMapping("{clubId}/addMember/{userId}")
    public void addMember(@PathVariable Integer clubId, @PathVariable Integer userId){
        Optional<User> optUser = userRepository.findById(userId);
        User user = null;

        if (optUser.isPresent()){
            user = optUser.get();
        }

        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
        }

        if (optClub.isPresent() && optUser.isPresent()){
            club.addMember(user);
        }
    }
}
