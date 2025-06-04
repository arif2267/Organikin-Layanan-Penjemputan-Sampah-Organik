export async function GET(request) {
    // Simulasi data untuk dashboard
    const dashboardData = {
      totalUsers: 150,
      pendingRequests: 10,
      recentActivities: [
        { id: 1, action: "User registered", timestamp: "2025-05-26T20:40:00+07:00" },
        { id: 2, action: "Request submitted", timestamp: "2025-05-26T20:42:00+07:00" },
      ],
    };
  
    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }