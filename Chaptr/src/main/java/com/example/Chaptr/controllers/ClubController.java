package com.example.Chaptr.controllers;

import com.example.Chaptr.data.BookRepository;
import com.example.Chaptr.data.ClubRepository;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.dto.ClubDTO;
import com.example.Chaptr.models.Book;
import com.example.Chaptr.models.Club;
import com.example.Chaptr.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    public void createClub(@RequestBody ClubDTO clubCreateDTO) {
        Club newClub = new Club();
        newClub.setClubMessage(clubCreateDTO.getClubMessage());
        newClub.setName(clubCreateDTO.getName());

        clubRepository.save(newClub);
    }

    @PostMapping("/joinClub/{clubId}")
    public Set<User> joinClub(@PathVariable int clubId, @RequestParam String email) {
        Optional<Club> optClub = clubRepository.findById(clubId);
        Optional<User> optUser = userRepository.findByEmail(email);

        if (!optClub.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found");
        }

        if (!optUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        Club club = optClub.get();
        User user = optUser.get();

        if (!club.getMembers().contains(user)) {
            club.addMember(user);
            clubRepository.save(club);
        }

        return club.getMembers();
    }

    @PostMapping("{clubId}/book")

    public void updateBOTM(@PathVariable int clubId, @RequestBody Book newBook){
        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
            club.setBookOfTheMonth(newBook);
            bookRepository.save(newBook);
        }
    }

    @PostMapping("{clubId}/description/{newDescription}")
    public void updateDescription(@PathVariable Integer clubId, @PathVariable String newDescription){
        Optional<Club> optClub = clubRepository.findById(clubId);
        Club club = null;

        if (optClub.isPresent()){
            club = optClub.get();
            club.setClubMessage(newDescription);
            clubRepository.save(club);
        }
    }
}