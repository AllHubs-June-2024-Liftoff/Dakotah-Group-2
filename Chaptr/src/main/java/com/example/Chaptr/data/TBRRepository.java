package com.example.Chaptr.data;

import com.example.Chaptr.models.TBR;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBRRepository extends CrudRepository<TBR, Integer> {}
