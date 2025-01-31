package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Favorites extends AbstractEntity {

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_favoritesList_books",
            joinColumns = @JoinColumn(name = "favoritesList_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> favoritesList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private String name;

    public Favorites(User user, List<Book> favoritesList, String name) {
        super();
        this.user = user;
        this.name = name;
        this.favoritesList = favoritesList != null ? favoritesList : new ArrayList<>();
    }

    public Favorites() {}

    public void addToFavoritesList(Book bookToAdd) {
        if (bookToAdd == null) return;
        if (favoritesList.contains(bookToAdd)) {
            return;
        }
        favoritesList.add(bookToAdd);
    }

    public void removeFromFavoritesList(Book bookToRemove) {
        if (bookToRemove != null) {
            favoritesList.remove(bookToRemove);
        }
    }

    public void clearFavoritesList() {
        favoritesList.clear();
    }

    public List<Book> getFavoritesList() {
        return favoritesList;
    }

    public void setFavoritesList(List<Book> favoritesList) {
        this.favoritesList = favoritesList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}