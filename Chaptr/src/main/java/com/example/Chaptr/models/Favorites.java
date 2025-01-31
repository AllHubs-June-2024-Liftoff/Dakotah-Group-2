package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Favorites extends AbstractEntity {

    // Using List<Book> to handle dynamic additions/removals.
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

    // Constructor
    public Favorites(User user, List<Book> favoritesList, String name) {
        super();
        this.user = user;
        this.name = name;
        this.favoritesList = favoritesList != null ? favoritesList : new ArrayList<>(); // Default to an empty list if null
    }

    // Default constructor
    public Favorites() {}

    // Add a book to the favorites list (if not already added)
    public void addToFavoritesList(Book bookToAdd) {
        if (bookToAdd == null) return; // Prevent adding null books
        if (favoritesList.contains(bookToAdd)) {
            return; // Don't add duplicate books
        }
        favoritesList.add(bookToAdd); // Adds the book to the list
    }

    // Remove a book from the favorites list
    public void removeFromFavoritesList(Book bookToRemove) {
        if (bookToRemove != null) {
            favoritesList.remove(bookToRemove); // Removes the book if it exists in the list
        }
    }

    // Clear all books from the favorites list
    public void clearFavoritesList() {
        favoritesList.clear(); // Clears all books from the list
    }

    // Getter and Setter methods
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
