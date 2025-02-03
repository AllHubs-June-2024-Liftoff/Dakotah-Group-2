package com.example.Chaptr.data;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.Chaptr.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @SuppressWarnings({"null", "override"})
    Optional<User> findById(Integer userId);
}