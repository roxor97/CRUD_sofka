package co.com.sofka.project_CRUD;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TodoController {


    @Autowired
    private TodoService service;


    @GetMapping(value ="/todos")
    public Iterable<Todo> list() {
        return service.list();
    }

    @PostMapping(value ="/todo")
    public Todo save(@RequestBody Todo todo) {
        return service.save(todo);
    }

    @PutMapping(value ="/todo")
    public Todo update(@RequestBody Todo todo) {
        if (todo.getId() != 0) {
            return service.save(todo);
        }
        throw new IllegalArgumentException("El id no puede ser nulo");
        
    }

    @DeleteMapping(value ="/{id}/todo")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @GetMapping(value ="/{id}/todo")
    public Todo get(@PathVariable("id") Long id) {
        return service.get(id);
    }
    

}
