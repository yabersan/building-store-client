import { useState } from "react";
import styles from "./Main.module.css";

const Card = (props) => {
  const products = props.products;
  const [btnStatus, setBtnStatus] = useState(false);

  function getProducts() {
    const cartLocalStorage = localStorage.getItem("cartProduct");
    if (cartLocalStorage !== null) {
      return JSON.parse(cartLocalStorage);
    }
    return [];
  }

  function addProduct(item, count) {
    const cartProducts = getProducts();
    let products = cartProducts;
    products.push(item);
    const listLength = products.length - 1;
    const result = products.map((item, i) => {
      if (i === listLength) {
        const cost = { ...item, count: count };
        return cost;
      }
      return item;
    });

    localStorage.setItem("cartProduct", JSON.stringify(result));
    setBtnStatus(!btnStatus);
  }

  return (
    <>
      {products.length > 0
        ? products.map((item) => {
            const localProd = JSON.parse(localStorage.getItem("cartProduct"));
            const buttonStat = () => {
              if (localProd === null) {
                return null;
              } else {
                const res = localProd.filter((product) => {
                  return product._id === item._id;
                });
                return res.length;
              }
            };

            const disabed = buttonStat();

            return (
              <div className={styles.block_of_searched}>
                <div className={styles.up_block}>
                  <div className={styles.picture_block}>
                    <img
                      className={styles.image_material}
                      src={`${item.productPicture}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.name_block}>
                      <p className={styles.name_product}>{item.productName}</p>
                    </div>
                    <div className={styles.in_up}>
                      <div className={styles.text_of_postav}>
                        <div className={styles.tochki}>
                          <p className={styles.gray_text}>Поставщик:</p>
                          <div className={styles.line}></div>
                          <p>{item.supplier} </p>
                        </div>
                        <div className={styles.tochki}>
                          <p className={styles.gray_text}>Цена: </p>
                          <div className={styles.line}></div>
                          <p>{item.price} </p>
                        </div>
                        <div className={styles.tochki}>
                          <p className={styles.gray_text}>Цена за доставку: </p>
                          <div className={styles.line}></div>
                          <p>1000 руб</p>
                        </div>
                      </div>
                      <div className={styles.whole_price_div}>
                        <p className={styles.whole_price}>
                          Цена всего:{" "}
                          <p className={styles.whole_price_num}>
                            {Number(item.price.split(" ")[0]) * props.count +
                              1000}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
                <div className={styles.in_down}>
                  <div className={styles.inputs_of_card}>
                    <input
                      type="button"
                      onClick={() => {
                        addProduct(item, props.count);
                      }}
                      value="ДОБАВИТЬ К ЗАКАЗУ"
                      disabled={disabed}
                    />
                    <input type="button" value="ЗАКАЗАТЬ" />
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Card;
