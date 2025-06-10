import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import IconChecked from '../../assets/svgs/ic_checked';
import IconCheck from '../../assets/svgs/icon_check';
import {User} from '../../store/reducers/userSlice';

type Props = {
  onCheck?: (member: User, isChecked: boolean) => void;
  member?: User;
  initialChecked?: boolean;
};

const CheckButton: React.FC<Props> = ({
  onCheck,
  member,
  initialChecked = false,
}) => {
  // Khởi tạo trạng thái checked từ prop initialChecked
  const [checked, setChecked] = useState(initialChecked);
  useEffect(() => {
    console.log(initialChecked);
  }, [initialChecked]);
  const onPress = () => {
    // Đảo ngược trạng thái checked hiện tại
    const newCheckedState = !checked;
    setChecked(newCheckedState); // Cập nhật trạng thái hiển thị của nút

    if (onCheck && member) {
      onCheck(member, newCheckedState);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress} // Gọi hàm onPress đã cập nhật logic
    >
      {/* Hiển thị icon tương ứng với trạng thái checked */}
      {initialChecked ? <IconChecked /> : <IconCheck />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center', // Đảm bảo icon được căn giữa
    padding: 8, // Thêm padding để dễ bấm hơn
  },
});

export default CheckButton;
