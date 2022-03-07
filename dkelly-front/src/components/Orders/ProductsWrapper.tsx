import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { ProductState } from "../../state/actions/product";

interface IProps {
  onClick: () => void;
}
export const ProductsWrapper: React.FC<IProps> = ({children, onClick}) => {
  return (
    <Box onClick={onClick}>
      {children}
    </Box>
  )
}
