package lk.ijse.posbackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date date;
    private String cusId;
    private List<ItemDTO> items;
    private double discount;
    private double total;

    public OrderDTO(ResultSet rs) throws SQLException {
        id = rs.getString(1);
        date = rs.getDate(2);
        cusId = rs.getString(3);
        items = new ArrayList<>();
        discount = rs.getDouble(4);
        total = rs.getDouble(5);
    }
}
