"use client"

import { useState } from 'react'
import { Bell, Plus, Users, Calendar, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function VolunteerDashboard() {
    const [totalVolunteers, setTotalVolunteers] = useState(250)
    const [recentActivities, setRecentActivities] = useState([
        { id: 1, name: 'Beach Cleanup', date: '2023-09-15', attendees: 20 },
        { id: 2, name: 'Food Drive', date: '2023-09-18', attendees: 15 },
        { id: 3, name: 'Tree Planting', date: '2023-09-20', attendees: 25 },
    ])
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Incomplete attendance record for Beach Cleanup', type: 'warning' },
        { id: 2, message: 'New volunteer application received', type: 'info' },
    ])

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Volunteer Management Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalVolunteers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{recentActivities.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        <Button size="sm">Add Activity</Button>
                        <Button size="sm">Add Volunteer</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{notifications.length}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>Overview of the latest volunteer activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivities.map((activity) => (
                                <li key={activity.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{activity.name}</p>
                                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{activity.attendees}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">View All Activities</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Important updates and alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {notifications.map((notification) => (
                                <li key={notification.id} className="flex items-start space-x-4">
                                    <Avatar className={notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}>
                                        <AvatarFallback>
                                            {notification.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{notification.message}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {notification.type === 'warning' ? 'Action required' : 'For your information'}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">View All Notifications</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}