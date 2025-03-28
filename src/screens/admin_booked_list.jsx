import React, { useEffect, useState } from 'react';
import { Card, Button, List, Modal, notification, Typography, Badge, Layout, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import useAuth from '../hooks/use_jwt_auth';
const { Header, Content } = Layout;
const { Text } = Typography;

function AdminBookingsList() {
    useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

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
        
        // Filter out bookings with no rides
        return Object.values(grouped).filter(booking => booking.rides.length > 0);
    };

    const calculateTotalTickets = (booking) => {
        return booking.rides.reduce((total, ride) => total + ride.tickets, 0);
    };

    const handleDelete = (booking) => {
        setCurrentBooking(booking);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_ENV_ENDPOINT}/admin/deletebooking`,
                {
                    data: {
                        bookingnumber: currentBooking.bookingnumber
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
                
                // Always update state based on server response
                setBookings(prevBookings => 
                    prevBookings.filter(b => b.bookingnumber !== currentBooking.bookingnumber)
                );
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'Delete failed',
                placement: 'topRight'
            });
        } finally {
            setLoading(false);
            setDeleteModalVisible(false);
        }
    };
    
    // And modify fetchBookings to maintain loading state properly:
    const fetchBookings = async () => {
        setLoading(true); // Ensure loading starts
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_ENV_ENDPOINT}/admin/mybookings`,
                {
                    email: "support@wednesdaysadventures.com"
                }
            );
            const groupedBookings = groupByBookingNumber(response.data.bookings);
            setBookings(groupedBookings);
        } catch (error) {
            notification.error({
                message: 'Couldnt Find Any Records',
                placement: 'topRight'
            });
        } finally {
            setLoading(false); // Only stop loading when everything is done
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