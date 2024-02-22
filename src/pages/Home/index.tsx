import { useCallback, useState } from "react";
import { useQuery } from "react-query";

// Icons
import { MdOutlineAddShoppingCart } from "react-icons/md";

// Components
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";

// Requests
import { getProducts } from "@/services/requests";

// Custom Hooks
import { useCart } from "@/hooks/useCart";

// Types
import { Product } from "@/@types/application";

import { Container, LoadingContainer } from "./styles";
import { showToastError, showToastSuccess } from "@/helpers/toast";

export function Home() {
  const { isLoading, data } = useQuery("moviesData", getProducts);
  const { addProduct, cart } = useCart();
  const [isAddProductLoadingState, setAddProductLoadingState] = useState(false);

  const handleAddProduct = useCallback(
    async (product: Product) => {
      try {
        setAddProductLoadingState(true);
        addProduct(product);
        showToastSuccess("Produto adicionado com sucesso");
        setAddProductLoadingState(false);
      } catch {
        showToastError("Error ao adicionar o produto ao carrinho.");
        setAddProductLoadingState(false);
      }
    },
    [addProduct]
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ul>
        {data?.map((product, index) => {
          const productInCart = cart?.find(
            (cartProduct) => cartProduct.id === product.id
          );
          return (
            <li key={product.id}>
              <Card.Container  >
                <Card.Image src={product.imageUrl}
                  data-cy={`card.image-${index}`} />
                <Card.Title text={product.title} />
                <Card.Price price={product.price} />
                <Button.Container
                  data-cy={`card.button-${index}`}
                  variant={productInCart ? "success" : "default"}
                  onClick={() => handleAddProduct(product)}
                  disabled={isAddProductLoadingState}
                >
                  <Button.Icon>
                    <MdOutlineAddShoppingCart size={16} color="#ffff" />
                    {productInCart?.quantity ?? 0}
                  </Button.Icon>
                  ADICIONAR AO CARRINHO
                </Button.Container>
              </Card.Container>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
