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

        for (int i = 0; i < favoritesList.length; i++) {
            if (favoritesList[i] != null && favoritesList[i].equals(bookToAdd)) {
                return;
            }
        }

        for (int i = 0; i < favoritesList.length; i++) {
            if (favoritesList[i] == null) {
                favoritesList[i] = bookToAdd;
                return;
            }
        }

        throw new IllegalStateException("Favorites list is full, please delete a book on your profile before adding more.");
    }

    public void removeFromFavoritesList(Book bookToRemove){
        for (int i = 0; i < favoritesList.length; i++) {
            if (favoritesList[i] == bookToRemove){
                favoritesList[i] = null;
            }
        }
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