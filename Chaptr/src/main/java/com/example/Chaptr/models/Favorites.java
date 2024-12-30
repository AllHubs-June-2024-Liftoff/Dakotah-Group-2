package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Favorites extends AbstractEntity {

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "user_favoritesList_books",
            joinColumns = @JoinColumn(name = "favoritesList_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Book[] favoritesList = new Book[3];

    @OneToOne(mappedBy = "favoritesList")
    @JsonIgnore
    private User user;

    public Favorites(User user, Book[] favoritesList){
        super();
        this.user = user;
        this.favoritesList = favoritesList != null ? favoritesList : new Book[3]; //ternary operator to create a new Book[3]/favoritesList if one does not exist.
    }

    public Favorites(){}

    public void addToFavoritesList(Book bookToAdd) {
        // Check if the book is already in the favorites list
        for (int i = 0; i < favoritesList.length; i++) {
            if (favoritesList[i] != null && favoritesList[i].equals(bookToAdd)) {
                return; // Do nothing if the book is already in the list
            }
        }
        // Add the book to the first available spot in the array
        for (int i = 0; i < favoritesList.length; i++) {
            if (favoritesList[i] == null) {
                favoritesList[i] = bookToAdd;
                return;
            }
        }
        // If the list is full, throw an exception
        throw new IllegalStateException("Favorites list is full, cannot add more books.");
    }

    public void removeFromFavoritesList(Integer i){ //will require front end to have buttons for each position of favorites book
        favoritesList[i] = null;
    }

    public void clearFavoritesList(){
       for (Book book : favoritesList){
           book = null;
       }
    }

    public Book[] getFavoritesList() {
        return favoritesList;
    }

    public void setFavoritesList(Book[] favoritesList) {
        this.favoritesList = favoritesList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
