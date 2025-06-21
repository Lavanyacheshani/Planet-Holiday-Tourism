interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  tourInterest: string;
  travelDates: string;
  groupSize: string;
  message: string;
}

interface GoogleFormsConfig {
  formUrl: string;
  formId: string;
  entryIds: {
    name: string;
    email: string;
    phone: string;
    tourInterest: string;
    travelDates: string;
    groupSize: string;
    message: string;
  };
}

class GoogleFormsService {
  private config: GoogleFormsConfig = {
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf...",
    formId: "1FAIpQLSf...",
    entryIds: {
      name: "entry.1234567890",
      email: "entry.0987654321",
      phone: "entry.1111111111",
      tourInterest: "entry.2222222222",
      travelDates: "entry.3333333333",
      groupSize: "entry.4444444444",
      message: "entry.5555555555",
    },
  };

  // Update configuration
  updateConfig(newConfig: Partial<GoogleFormsConfig>) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem("googleFormsConfig", JSON.stringify(this.config));
  }

  // Load configuration from localStorage
  loadConfig() {
    const saved = localStorage.getItem("googleFormsConfig");
    if (saved) {
      this.config = { ...this.config, ...JSON.parse(saved) };
    }
    return this.config;
  }

  // Submit booking data to Google Forms
  async submitBooking(data: BookingFormData): Promise<boolean> {
    try {
      const formData = new FormData();

      // Add form fields
      formData.append(this.config.entryIds.name, data.name);
      formData.append(this.config.entryIds.email, data.email);
      formData.append(this.config.entryIds.phone, data.phone);
      formData.append(this.config.entryIds.tourInterest, data.tourInterest);
      formData.append(this.config.entryIds.travelDates, data.travelDates);
      formData.append(this.config.entryIds.groupSize, data.groupSize);
      formData.append(this.config.entryIds.message, data.message);

      // Add timestamp
      formData.append("entry.6666666666", new Date().toISOString());

      // Submit to Google Forms
      await fetch(this.config.formUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Required for Google Forms
      });

      // Since no-cors doesn't return response details, we assume success
      console.log("Booking submitted to Google Forms:", data);

      // Store in local storage for admin panel
      this.storeBookingLocally(data);

      return true;
    } catch (error) {
      console.error("Error submitting to Google Forms:", error);
      return false;
    }
  }

  // Store booking data locally for admin panel
  private storeBookingLocally(data: BookingFormData) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      status: "pending" as const,
    };
    bookings.unshift(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings.slice(0, 100))); // Keep last 100
  }

  // Get all bookings from local storage
  getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  }

  // Update booking status
  updateBookingStatus(
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) {
    const bookings = this.getBookings();
    const updatedBookings = bookings.map(
      (
        booking: BookingFormData & {
          id: string;
          timestamp: string;
          status: string;
        }
      ) => (booking.id === id ? { ...booking, status } : booking)
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  }

  // Delete booking
  deleteBooking(id: string) {
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter(
      (booking: BookingFormData & { id: string }) => booking.id !== id
    );
    localStorage.setItem("bookings", JSON.stringify(filteredBookings));
  }

  // Test the integration
  async testIntegration(): Promise<boolean> {
    const testData: BookingFormData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      tourInterest: "Test Tour",
      travelDates: "Test Dates",
      groupSize: "2",
      message: "This is a test booking from the admin panel.",
    };

    return await this.submitBooking(testData);
  }
}

export const googleFormsService = new GoogleFormsService();
export type { BookingFormData, GoogleFormsConfig };
