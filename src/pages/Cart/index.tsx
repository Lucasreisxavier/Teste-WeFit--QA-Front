import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

// Custom Hook
import { UpdateProductQuantity, useCart } from "@/hooks/useCart";

// Components
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";

// Types
import { ProductInCart } from "@/@types/application";

// Helpers
import { formatPrice } from "@/helpers/formatPrice";

// Assets
import EmptyAvatar from "@/assets/images/empty.svg";

import {
  Container,
  EmptyContainer,
  InputContainer,
  SubTotalContainer,
  Total,
  Wrapper,
  ActionButton,
  TitleAndPrice,
  Image,
  WrapperMobile,
  InputAndSubTotal,
} from "./styles";
import { toast } from "react-toastify";
import { CartProductRow } from "./components/CartProductRow";
import { useMemo, useState } from "react";
import { showToastError, showToastSuccess } from "@/helpers/toast";

export function Cart() {
  const { cart, removeProduct, updateProductQuantity, finishPurchase } =
    useCart();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 540px)");
  const [isLoadingState, setIsLoadingState] = useState(false);

  const cartFormatted = useMemo(
    () =>
      cart.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        subtotal: formatPrice(product.price * product.quantity),
      })),
    [cart]
  );

  const total = useMemo(
    () =>
      formatPrice(
        cartFormatted.reduce((sumTotal, product) => {
          sumTotal += product.price * product.quantity;

          return sumTotal;
        }, 0)
      ),
    [cartFormatted]
  );

  async function updateProductAmountRequest(params: UpdateProductQuantity) {
    try {
      setIsLoadingState(true);
      updateProductQuantity(params);
      setIsLoadingState(false);
      showToastSuccess("Quantidade do produto alterada com successo.");
    } catch {
      setIsLoadingState(false);
      showToastError("Erro na alteração de quantidade do produto");
    }
  }

  function handleProductIncrement(product: ProductInCart) {
    const incrementParams = {
      productId: product.id,
      quantity: product.quantity + 1,
    };
    updateProductAmountRequest(incrementParams);
  }

  function handleProductDecrement(product: ProductInCart) {
    const decrementParams = {
      productId: product.id,
      quantity: product.quantity - 1,
    };
    updateProductAmountRequest(decrementParams);
  }

  async function handleRemoveProduct(productId: string) {
    try {
      setIsLoadingState(true);
      await removeProduct(productId);
      setIsLoadingState(false);
      showToastSuccess("Produto removido com successo.");
    } catch {
      setIsLoadingState(false);
      showToastError("Error ao remover o produto ao carrinho.");
    }
  }

  async function handleFinishPurchase() {
    try {
      const isfinishedPuchase = await finishPurchase();
      return isfinishedPuchase
        ? navigate("/cart/success")
        : toast.error("Erro ao finalizar compra", {
          autoClose: 3000,
          theme: "colored",
        });
    } catch {
      showToastError("Erro na finalização do seu pedido");
    }
  }

  if (cart.length === 0)
    return (
      <Container>
        <Card.Container>
          <EmptyContainer>
            <h1>{"Parece que não há nada por aqui :("}</h1>

            <img
              src={EmptyAvatar}
              alt="Avatar de Empty, para apresetação do carrinho quando ele se encontra vazio."
            />

            <Button.Container
              data-cy={'back'} onClick={() => navigate("/")}>
              Voltar
            </Button.Container>
          </EmptyContainer>
        </Card.Container>
      </Container>
    );

  return (
    <Wrapper>
      {matches ? (
        <Table.Container>
          <Table.Header.Container>
            <Table.Header.Item title="PRODUTO" />
            <Table.Header.Item title="QTD" />
            <Table.Header.Item title="SUBTOTAL" />
            <Table.Header.Item title="" />
          </Table.Header.Container>
          {cartFormatted.map((product) => (
            <CartProductRow
              product={product}
              handleProductIncrement={handleProductIncrement}
              handleProductDecrement={handleProductDecrement}
              handleRemoveProduct={handleRemoveProduct}
              isLoading={isLoadingState}
            />
          ))}
          <Table.Footer>
            <Button.Container
              onClick={handleFinishPurchase}
              disabled={isLoadingState}
            >
              Finalizar pedido
            </Button.Container>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </Table.Footer>
        </Table.Container>
      ) : (
        <Table.Container>
          {cartFormatted.map((product) => (
            <Table.Row key={product.id}>
              <Image src={product.imageUrl} alt={product.title} />
              <WrapperMobile>
                <TitleAndPrice>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                  <ActionButton
                    type="button"
                    onClick={() => handleRemoveProduct(product.id)}
                    disabled={isLoadingState}
                  >
                    <MdDelete size={20} />
                  </ActionButton>
                </TitleAndPrice>
                <InputAndSubTotal>
                  <InputContainer>
                    <ActionButton
                      type="button"
                      disabled={isLoadingState || product.quantity <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </ActionButton>
                    <input type="text" readOnly value={product.quantity} />
                    <ActionButton
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                      disabled={isLoadingState}
                    >
                      <MdAddCircleOutline size={20} />
                    </ActionButton>
                  </InputContainer>
                  <SubTotalContainer>
                    <span>SUBTOTAL</span>
                    <strong>{product.subtotal}</strong>
                  </SubTotalContainer>
                </InputAndSubTotal>
              </WrapperMobile>
            </Table.Row>
          ))}
          <Table.Footer>
            <Button.Container
              onClick={handleFinishPurchase}
              disabled={isLoadingState}
              data-cy={`finish`}
            >
              Finalizar pedido
            </Button.Container>
            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </Table.Footer>
        </Table.Container>
      )}
    </Wrapper>
  );
}
