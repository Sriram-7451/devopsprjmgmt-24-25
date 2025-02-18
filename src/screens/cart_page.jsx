import React from 'react';
import { Layout, List, Button, Card, Typography, Image, Flex, Empty } from 'antd';
import { Link } from 'react-router-dom';
import useCartStore from '../store/store_cart_items';
import {
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '0 20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    position: 'fixed',
                    zIndex: 1000,
                    width: "100%",
                    height: 64,
                    minHeight: 64
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logoImage}
                        width="50px"
                        height="50px"
                        style={{ marginRight: '10px' }}
                        alt="Logo"
                    />
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Wednesday Adventures</span>
                </div>

                <Flex gap="middle">
                    <Link to="/cart">
                        <Button type="primary" icon={<ShoppingCartOutlined />}>
                            Cart ({cart.length})
                        </Button>
                    </Link>
                    <Link to="/homepage">
                        <Button icon={<HomeOutlined />}>Home</Button>
                    </Link>
                    <Link to="/about">
                        <Button icon={<UserOutlined />}>About</Button>
                    </Link>
                </Flex>
            </Header>

            <Content style={{
                marginTop: 64,
                padding: '20px',
                minHeight: 'calc(100vh - 64px)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
                        <Title level={3}>Your Cart</Title>
                        {cart.length > 0 && (
                            <Flex gap="middle">
                                <Button type="primary" danger onClick={clearCart}>
                                    Remove All
                                </Button>
                                <Button type="primary" onClick={() => alert('Proceeding to payment...')}>
                                    Buy Now
                                </Button>
                            </Flex>
                        )}
                    </Flex>

                    {cart.length === 0 ? (
                        <Flex 
                            vertical 
                            align="center" 
                            justify="center" 
                            style={{ height: 'calc(100vh - 200px)' }}
                        >
                            <Empty
                                description={
                                    <Paragraph style={{ color: '#636e72' }}>
                                        No items in cart. <Link to="/homepage">Browse rides here!</Link>
                                    </Paragraph>
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Flex>
                    ) : (
                        <List
                            dataSource={cart}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card
                                        style={{ width: '100%' }}
                                        actions={[
                                            <Button danger onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </Button>
                                        ]}
                                    >
                                        <Flex align="center" gap="middle">
                                            <Image
                                                src={item.image}
                                                width={100}
                                                height={100}
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div>
                                                <Title level={5}>{item.name}</Title>
                                                <p>{item.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </Flex>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Content>
        </Layout>
    );
}

export default CartPage;