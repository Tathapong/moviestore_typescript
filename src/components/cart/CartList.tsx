import { Paper, Box, List, ListItem } from "@mui/material";
import useAllContext from "../../contexts/useAllContext";

function CartList() {
  const context = useAllContext();
  return (
    <Paper>
      <Box>
        <List>
          {context.cart.map((item) => (
            <ListItem></ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default CartList;
