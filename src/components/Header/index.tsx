import { Link } from "react-router-dom";
import { Container, CarLink } from "./styles";
import { MdShoppingBasket } from "react-icons/md";
import { useCart } from "@/hooks/useCart";
import { useMemo } from "react";

export function Header() {
  const { cart } = useCart();
  const productCount = useMemo(
    () => cart.reduce((acc, product) => acc + product.quantity, 0),
    [cart]
  );

  return (
    <Container>
      <Link to="/">
        <h2>WeMovies</h2>
      </Link>
      <nav data-cy={`cart-button`}>
        <CarLink to="/cart" >
          <div>
            <strong>Meu Carrinho</strong>
            <span>
              {productCount === 1
                ? `${productCount} item`
                : `${productCount} itens`}
            </span>
          </div>
          <MdShoppingBasket color="#fff" size={32} />
        </CarLink>
      </nav>
    </Container>
  );
}
