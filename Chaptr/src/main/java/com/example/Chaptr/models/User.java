package com.example.Chaptr.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
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
    private String email;

    @NotNull
    @NotBlank(message = "location cannot be blank")
    private String location;

    @OneToOne(cascade = CascadeType.ALL)
    private Image userImage;

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
        this.setUserImage(userImage);
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

    public Image getUserImage() {
        return userImage;
    }

    public void setUserImage(Image userImage) {
        this.userImage = userImage;
    }

}