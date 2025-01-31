package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties("clubs")
public class User extends AbstractEntity {

    @NotNull(message = "Enter your First Name")
    @Size(min=3, max = 50, message = "First Name must be between 3-50 characters")
    private String firstName;

    @NotNull(message = "Enter your Last Name")
    @Size(min=3, max = 50, message = "Last Name must be between 3-50 characters")
    private String lastName;

    @NotNull
    @Size(min=5)
    private String pwHash;

    @NotNull
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Please provide a valid email address")
    @Column(unique = true)
    private String email;

    @NotNull
    @NotBlank(message = "location cannot be blank")
    private String location;

    private String userImage;

    @ManyToMany(mappedBy = "members")
    @JsonBackReference
    private Set<Club> clubs = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "tbr_id")
    @JsonIgnore
    private TBR tbr;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "favoritesList_id")
    @JsonIgnore
    private Favorites favoritesList;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User() {}

    public User(String firstName, String lastName, String password, String email, String location) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwHash = encoder.encode(password);
        this.email = email;
        this.location = location;
        this.setName(firstName, lastName);
    }

    public User(String firstName, String lastName, String password, String email, String location, String userImage) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwHash = encoder.encode(password);
        this.email = email;
        this.location = location;
        this.setName(firstName, lastName);
        this.userImage = userImage;
    }

    public void setName(String firstName, String lastName) {
        this.setName(firstName + " " + lastName);
    }

    public @NotNull(message = "Enter your First Name") @Size(min = 3, max = 50, message = "First Name must be between 3-50 characters") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotNull(message = "Enter your First Name") @Size(min = 3, max = 50, message = "First Name must be between 3-50 characters") String firstName) {
        this.firstName = firstName;
    }

    public @NotNull(message = "Enter your Last Name") @Size(min = 3, max = 50, message = "Last Name must be between 3-50 characters") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotNull(message = "Enter your Last Name") @Size(min = 3, max = 50, message = "Last Name must be between 3-50 characters") String lastName) {
        this.lastName = lastName;
    }

    public @NotNull @Size(min = 5) String getPwHash() {
        return pwHash;
    }

    public void setPwHash(@NotNull @Size(min = 5) String pwHash) {
        this.pwHash = pwHash;
    }

    public @NotNull @NotBlank(message = "email cannot be blank") String getEmail() {
        return email;
    }

    public void setEmail(@NotNull @NotBlank(message = "email cannot be blank") String email) {
        this.email = email;
    }

    public @NotNull @NotBlank(message = "location cannot be blank") String getLocation() {
        return location;
    }

    public void setLocation(@NotNull @NotBlank(message = "location cannot be blank") String location) {
        this.location = location;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public TBR getTbr() {
        return tbr;
    }

    public void setTbr(TBR tbr) {
        this.tbr = tbr;
    }

    public Favorites getFavoritesList() {
        return favoritesList;
    }

    public void setFavoritesList(Favorites favoritesList) {
        this.favoritesList = favoritesList;
    }

    public Set<Club> getClubs() {
        return clubs;
    }

    public void setClubs(Set<Club> clubs) {
        this.clubs = clubs;
    }
}