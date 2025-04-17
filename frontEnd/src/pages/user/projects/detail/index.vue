.project-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 64px);
  background-color: #f0fdf4;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease-out;
}

.project-title h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #166534;
  font-weight: 600;
}

.project-tags {
  display: flex;
  gap: 0.75rem;
}

.project-price {
  text-align: right;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project-price:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #16a34a;
}

.project-gallery {
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
}

.project-content {
  display: flex;
  gap: 2rem;
  animation: fadeInUp 0.5s ease-out;
}

.project-main {
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: all 0.3s ease;
}

.project-main:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.booking-sidebar {
  width: 350px;
}

.booking-card, .contact-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.booking-card:hover, .contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.booking-card h2, .contact-card h3 {
  margin: 0 0 1.5rem 0;
  color: #166534;
  font-weight: 600;
}

.booking-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin: 1rem 0;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
}

.total-price {
  color: #16a34a;
  font-size: 1.5rem;
}

.overview h2, .notes h2 {
  color: #166534;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dcfce7;
}

.highlights li, .includes li, .excludes li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #dcfce7;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.highlights li:hover, .includes li:hover, .excludes li:hover {
  background: #f0fdf4;
  padding-left: 1rem;
  border-radius: 0.5rem;
}

.review-item {
  border-bottom: 1px solid #dcfce7;
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.review-item:hover {
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 0 -1.5rem 1.5rem;
}

.el-button--success {
  background-color: #16a34a;
  border-color: #16a34a;
  font-weight: 600;
  height: 3rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.el-button--success:hover {
  background-color: #15803d;
  border-color: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
}

@media (max-width: 768px) {
  .project-content {
    flex-direction: column;
  }
  
  .booking-sidebar {
    width: 100%;
  }
  
  .project-header {
    flex-direction: column;
  }
  
  .project-price {
    text-align: left;
    margin-top: 1rem;
    width: 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
} 