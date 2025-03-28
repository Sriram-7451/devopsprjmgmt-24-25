import React, { useEffect, useState } from 'react';
import { Card, Button, List, Modal, notification, Typography, Badge, Layout, Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Header, Content } = Layout;
const { Text, Title } = Typography;

function AdminBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_ENV_ENDPOINT}/admin/mybookings`,
                {
                    email: "support@wednesdaysadventures.com"
                }
            );      // Group bookings by bookingnumber
            const groupedBookings = groupByBookingNumber(response.data.bookings);
            setBookings(groupedBookings);
        } catch (error) {
            notification.error({
                message: 'Failed to load bookings',
                placement: 'topRight'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/logout`);
            notification.success({
                message: 'Logout Successful',
                placement: 'topRight',
            });
            navigate('/');
        } catch (error) {
            notification.error({
                message: 'Logout Failed',
                placement: 'topRight',
            });
        }
    };

    const groupByBookingNumber = (bookingsArray) => {
        const grouped = {};
        bookingsArray.forEach(booking => {
            if (!grouped[booking.bookingnumber]) {
                grouped[booking.bookingnumber] = {
                    ...booking,
                    rides: []
                };
            }
            grouped[booking.bookingnumber].rides.push({
                park: booking.park,
                tickets: parseInt(booking.adventure.match(/tickets-(\d+)/)[1])
            });
        });
        return Object.values(grouped);
    };

    const calculateTotalTickets = (booking) => {
        return booking.rides.reduce((total, ride) => total + ride.tickets, 0);
    };

    const handleDelete = (booking) => {
        setCurrentBooking(booking);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_ENV_ENDPOINT}/admin/deletebooking`,
                {
                    data: {
                        bookingnumber: currentBooking.bookingnumber // Send directly in the body
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: `Booking ${currentBooking.bookingnumber} deleted`,
                    placement: 'topRight'
                });
                fetchBookings();
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'Delete failed',
                placement: 'topRight'
            });
        } finally {
            setDeleteModalVisible(false);
        }
    };

    return (
        <div>
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
                        width: "100%"
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Manage Bookings</span>
                    </div>

                    <Flex gap="middle">
                        <Link to="/homepage">
                            <Button icon={<HomeOutlined />}>Home</Button>
                        </Link>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "red", marginTop: "15px" }}
                            icon={<LogoutOutlined />}
                            onClick={() => {
                                handleLogout(); // Call the function
                                localStorage.setItem("token", null); // Set token to null
                            }}                    >
                            Logout
                        </Button>
                    </Flex>
                </Header>
                <Content style={{ padding: '20px', marginTop: '64px' }}>

                    <List
                        loading={loading}
                        dataSource={bookings}
                        renderItem={(booking) => (
                            <List.Item>
                                <Card
                                    style={{ width: '100%', borderRadius: '4px' }}
                                    bodyStyle={{ padding: '16px' }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ flex: 2 }}>
                                            <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                                                {booking.email}
                                            </Text>
                                            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                                                Booking #: {booking.bookingnumber}
                                            </Text>
                                            <div style={{ marginBottom: '8px' }}>
                                                <Text strong>Date: </Text>
                                                <Text>{new Date(booking.date).toLocaleDateString()}</Text>
                                            </div>
                                            <div>
                                                <Text strong>Rides: </Text>
                                                {booking.rides.map((ride, index) => (
                                                    <Badge
                                                        key={index}
                                                        count={`${ride.park} (${ride.tickets})`}
                                                        style={{
                                                            backgroundColor: '#f0f0f0',
                                                            color: '#666',
                                                            marginRight: '8px',
                                                            padding: '0 8px',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, textAlign: 'right' }}>
                                            <Text strong style={{ display: 'block', fontSize: '18px' }}>
                                                Total Tickets: {calculateTotalTickets(booking)}
                                            </Text>
                                            <div style={{ marginTop: '16px' }}>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ marginRight: '8px' }}
                                                    onClick={() => console.log('Edit booking:', booking.bookingnumber)}
                                                />
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    danger
                                                    onClick={() => handleDelete(booking)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Modal
                        title="Confirm Delete"
                        open={deleteModalVisible}
                        onOk={confirmDelete}
                        onCancel={() => setDeleteModalVisible(false)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <p>Are you sure you want to delete this booking?</p>
                        <p><strong>Booking #:</strong> {currentBooking?.bookingnumber}</p>
                        <p><strong>Email:</strong> {currentBooking?.email}</p>
                        <p><strong>Total Tickets:</strong> {currentBooking ? calculateTotalTickets(currentBooking) : 0}</p>
                    </Modal>
                </Content>
            </Layout>
        </div>
    );
}

export default AdminBookingsList;