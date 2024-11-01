import React from 'react';
import { fireEvent, getAllByText, render } from '@testing-library/react';
import { getYear } from 'date-fns';
import { composeStories } from '@storybook/testing-react';
import * as stories from './ranger-picker.stories';

import { RangePicker } from './range-picker';

const { Default, SingleType } = composeStories(stories);

describe('RangerPicker Component', () => {
  test('render open RangerPicker', () => {
    const { getByTestId } = render(<Default />);
    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);
    const rangerPickerContainer = getByTestId('ranger-content');
    expect(rangerPickerContainer).toBeVisible();
  });

  test('should close when the user clicks escape', () => {
    const { getByTestId } = render(<Default />);
    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);
    const rangerPickerContainer = getByTestId('ranger-content');

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(rangerPickerContainer).not.toBeVisible();
  });

  test('should select a start and finish date', async () => {
    const { getByTestId } = render(<Default />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const rangerPickerContainer = getByTestId('ranger-content');
    const containerInitialDate = getAllByText(rangerPickerContainer, '2')[0];
    fireEvent.click(containerInitialDate);

    const containerEndDate = getAllByText(rangerPickerContainer, '15')[0];
    fireEvent.click(containerEndDate);

    const applyButton = getByTestId('ranger-apply');

    fireEvent.click(applyButton);

    const current = new Date();

    const startDate = new Date(getYear(current), current.getMonth(), 1);
    const endDate = new Date(getYear(current), current.getMonth(), 15);

    expect(consoleSpy).toHaveBeenCalledWith({
      from: startDate,
      to: endDate,
      type: 'custom',
    });

    consoleSpy.mockRestore();
  });

  test(' should select a correct today period', async () => {
    const { getByTestId } = render(<Default />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const today = getByTestId('range-today');
    fireEvent.click(today);

    const applyButton = getByTestId('ranger-apply');

    fireEvent.click(applyButton);

    const todayDate = new Date();
    const date = new Date(
      todayDate?.getFullYear(),
      todayDate?.getMonth(),
      todayDate?.getDate()
    );

    const logCalls = consoleSpy.mock.calls;
    const loggedFrom = logCalls[0][0].from;
    const loggedTo = logCalls[0][0].to;

    console.log(loggedFrom, loggedTo);
    const normalizedLoggedFrom = new Date(
      loggedFrom?.getFullYear(),
      loggedFrom?.getMonth(),
      loggedFrom?.getDate()
    );
    const normalizedLoggedTo = new Date(
      loggedTo?.getFullYear(),
      loggedTo?.getMonth(),
      loggedTo?.getDate()
    );

    expect(normalizedLoggedFrom).toEqual(date);
    expect(normalizedLoggedTo).toEqual(date);

    consoleSpy.mockRestore();
  });

  test(' should select a correct yesterday period', async () => {
    const { getByTestId } = render(<Default />);
    const consoleSpy = jest.spyOn(console, 'log');

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const yesterday = getByTestId('range-yesterday');
    fireEvent.click(yesterday);

    const applyButton = getByTestId('ranger-apply');

    fireEvent.click(applyButton);

    const todayDate = new Date();
    const yesterdayDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - 1
    );

    const logCalls = consoleSpy.mock.calls;
    const loggedFrom = logCalls[0][0].from;
    const loggedTo = logCalls[0][0].to;

    const normalizedLoggedFrom = new Date(
      loggedFrom.getFullYear(),
      loggedFrom.getMonth(),
      loggedFrom.getDate()
    );
    const normalizedLoggedTo = new Date(
      loggedTo.getFullYear(),
      loggedTo.getMonth(),
      loggedTo.getDate()
    );

    expect(normalizedLoggedFrom).toEqual(yesterdayDate);
    expect(normalizedLoggedTo).toEqual(yesterdayDate);

    jest.useRealTimers();
    consoleSpy.mockRestore();
  });

  test.only('should select a correct this month period', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <RangePicker type='range' onChange={handleChange} />
    );

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const thisMonth = getByTestId('range-this-month');
    fireEvent.click(thisMonth);

    const applyButton = getByTestId('ranger-apply');
    fireEvent.click(applyButton);

    const todayDate = new Date();
    const startDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      1
    );
    const endDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );

    expect(handleChange).toHaveBeenCalledWith({
      from: startDate,
      to: endDate,
      type: 'this-month',
    });
  });

  test('should select a correct this year period', async () => {
    const { getByTestId } = render(<Default />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const thisYear = getByTestId('range-this-year');
    fireEvent.click(thisYear);

    const applyButton = getByTestId('ranger-apply');

    fireEvent.click(applyButton);

    const todayDate = new Date();
    const startDate = new Date(todayDate.getFullYear(), 0, 1);
    const endDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );

    const logCalls = consoleSpy.mock.calls;
    const loggedFrom = logCalls[0][0].from;
    const loggedTo = logCalls[0][0].to;

    const normalizedLoggedFrom = new Date(
      loggedFrom.getFullYear(),
      loggedFrom.getMonth(),
      loggedFrom.getDate()
    );
    const normalizedLoggedTo = new Date(
      loggedTo.getFullYear(),
      loggedTo.getMonth(),
      loggedTo.getDate()
    );

    expect(normalizedLoggedFrom).toEqual(startDate);
    expect(normalizedLoggedTo).toEqual(endDate);

    consoleSpy.mockRestore();
  });

  test('should select the date in the input field', async () => {
    const { getByTestId } = render(<Default />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const initialDateInput = getByTestId('initial-date');
    const endDateInput = getByTestId('end-date');

    fireEvent.focus(initialDateInput);
    fireEvent.change(initialDateInput, { target: { value: '' } });

    fireEvent.change(initialDateInput, { target: { value: '2022/08/01' } });
    fireEvent.blur(initialDateInput);

    fireEvent.focus(endDateInput);
    fireEvent.change(endDateInput, { target: { value: '' } });
    fireEvent.change(endDateInput, { target: { value: '2022/08/15' } });

    fireEvent.blur(endDateInput);

    const applyButton = getByTestId('ranger-apply');
    fireEvent.click(applyButton);

    expect(consoleSpy).toHaveBeenCalledWith({
      from: new Date('2022/08/01'),
      to: new Date('2022/08/15'),
      type: 'custom',
    });
  });

  // SingleType

  test('render open RangerPicker', () => {
    const { getByTestId } = render(<SingleType />);
    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);
    const rangerPickerContainer = getByTestId('ranger-content');
    expect(rangerPickerContainer).toBeVisible();
  });

  test('should close when the user clicks escape', () => {
    const { getByTestId } = render(<SingleType />);
    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);
    const rangerPickerContainer = getByTestId('ranger-content');

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(rangerPickerContainer).not.toBeVisible();
  });

  test('should select a date', async () => {
    const { getByTestId } = render(<SingleType />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const rangerPickerTrigger = getByTestId('ranger-trigger');
    fireEvent.click(rangerPickerTrigger);

    const rangerPickerContainer = getByTestId('ranger-content');
    const containerDate = getAllByText(rangerPickerContainer, '20')[0];
    fireEvent.click(containerDate);

    // const current = new Date();
    // const selectedDate = new Date(getYear(current), current.getMonth(), 20);

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
