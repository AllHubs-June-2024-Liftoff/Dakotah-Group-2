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
        if (favoritesList[0] == null){
            favoritesList[0] = bookToAdd;
        } else if (favoritesList[1] == null){
            favoritesList[1] = bookToAdd;
        } else if (favoritesList[2] == null){
            favoritesList[2] = bookToAdd;
        } //This should do something like throw an exception or have an event listener
        //this still allows a user to add the same book twice
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
