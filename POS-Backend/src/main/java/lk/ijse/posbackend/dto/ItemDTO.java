package lk.ijse.posbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private String code;
    private String name;
    private int qty;
    private double price;

    public ItemDTO(ResultSet rs) throws SQLException {
        code  = rs.getString(1);
        name  = rs.getString(2);
        qty  = rs.getInt(3);
        price  = rs.getDouble(4);
    }
}
