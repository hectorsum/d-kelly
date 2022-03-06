import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { ProductState } from "../../state/actions/product";

export const ProductsWrapper: React.FC = ({children}) => {
  return (
    <Box>
      {children}
    </Box>
  )
}
