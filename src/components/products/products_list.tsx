import React, { useEffect } from 'react'
import './products.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductsAction } from '../../modules/@ProductModule/products.actions';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './products.css';

const ProductsList = (props: any) => {

  const productsActionDispatcher = useAppDispatch();

  const navigate = useNavigate();

  const { category } = useParams<{category : any}>();

  const productsData: any = useAppSelector(state => state.productsData);

  let ProductsList = [];
  if (category) {
    ProductsList = productsData[category];
  }


  useEffect(() => {
    if (category) {
      if (!productsData[category] || productsData[category].length === 0) {
        productsActionDispatcher(getProductsAction(category));
      } else {
        console.log(productsData);
      }
    }
  }, [category]);


  const goToProductsDetails = ((id: number) => {
    navigate(`/product/${id}`)
  })


  return (
    <div className="products">
      {ProductsList.map((product: any, index: number) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.thumbnail} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Button variant="primary" onClick={() => goToProductsDetails(product._id)} >Go To Product Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProductsList
