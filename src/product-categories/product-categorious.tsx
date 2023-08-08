import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { ProductCategoriousConfig } from './product-catergories-config';
import { useNavigate } from 'react-router-dom';

const ProductCategorious = () => {

    const navigate = useNavigate();
    const productsList = ProductCategoriousConfig;

    function goToProducts(categoryName: any): void {
         navigate(`/products/${categoryName}`);
    }

    return (
        <>
            {
                <Row style={{padding: "0 50px"}}>
                    {productsList.map((item, index) => (
                        <Col key={index} className="col-4" ><br/>
                            <Card>
                                <Card.Img variant="top" src={item.cardImg} style={{height:"40vh"}} />
                                <Card.Body>
                                    <Card.Title>{item.cardTitle}</Card.Title>
                                    <Button variant="primary" onClick={() => goToProducts(item.categoryName)}>Go To Products</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </>
    );
}

export default ProductCategorious
