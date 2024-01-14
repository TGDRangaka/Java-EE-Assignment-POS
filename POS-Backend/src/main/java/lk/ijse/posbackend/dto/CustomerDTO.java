package lk.ijse.posbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String id;
    private String name;
    private String address;
    private double salary;

    public CustomerDTO(ResultSet rs) throws SQLException {
        id = rs.getString(1);
        name = rs.getString(2);
        address = rs.getString(3);
        salary = rs.getDouble(4);
    }
}
