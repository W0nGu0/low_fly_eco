// 处理预订
function handleBooking() {
  if (!bookingDate.value) {
    ElMessage.warning('请选择出发日期');
    return;
  }
  
  // 创建预订信息，使用正确的日期格式
  const formattedDate = bookingDate.value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');

  const bookingInfo = {
    projectId: 5,
    projectName: '动力伞体验',
    date: formattedDate,
    price: 1580,
    participants: participants.value,
    totalPrice: 1580 * participants.value,
  };

  // 存储预订信息到本地存储
  localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));

  // 显示成功消息
  ElMessage.success('预订信息已保存，正在跳转到预订页面...');
  
  // 跳转到预订页面，使用正确格式的日期
  setTimeout(() => {
    router.push({
      path: `/user/booking/5`,
      query: {
        date: formattedDate,
        participants: participants.value
      }
    });
  }, 1500);
} 