import { StyleSheet } from 'react-native';
import { getSize } from '../../helpers/responsive';

const styles = StyleSheet.create({
  headerSchedule: {
    fontSize: getSize.m(16),
    fontWeight: '600',
    color: '#7646FF',
    alignSelf: 'center',
    marginTop: getSize.m(10),
  },
  containerDatePicker: {
    height: getSize.v(70),
    marginTop: getSize.m(10),
  },
  arrayDatePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: getSize.m(10),
  },
  containerEachDate: {
    width: getSize.m(45),
    height: getSize.m(65),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getSize.m(10),
  },
  activeDateContainer: {
    backgroundColor: '#7646FF',
  },
  weekday: {
    fontSize: getSize.m(12),
    color: '#7646FF',
    marginBottom: getSize.m(5),
  },
  dateNumber: {
    fontSize: getSize.m(16),
    color: '#7646FF',
    fontWeight: '500',
  },
  activeDate: {
    color: '#fff',
  },
  markIcon: {
    width: getSize.m(20),
    height: getSize.m(20),
    position: 'absolute',
    bottom: -getSize.m(5),
  },
});

export default styles; 