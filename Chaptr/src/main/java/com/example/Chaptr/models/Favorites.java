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

//Add, Remove, and Clear
//    public void addToFavoritesList(Book bookToAdd) {
//        //if it does not contain, add AND if it is not full
//        //if (!tbr.contains(bookToAdd)){
//        //{tbr.add(bookToAdd);
//        //}
//    }
//
//    public void removeFromFavoritesList(Book bookToRemove){
//        //remove a book from the list
//        //tbr.remove(bookToRemove);
//    }
//
//    public void clearFavoritesList(){
//       // favoritesList.clear();
//    }

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
