import React from 'react';

import { render, screen } from '@testing-library/react';
import { SelectList, SelectItem } from './select-list';

describe('SelectList', () => {
  it('should render', () => {
    render(
      <SelectList type="single" onChangeValue={() => {}}>
        <SelectItem value="1" label="Teste" />
      </SelectList>
    );

    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('should render with multiple type', () => {
    render(
      <SelectList type="multiple" onChangeValue={() => {}}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
      </SelectList>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should call onChangeValue when an item is selected in single mode', () => {
    const handleChangeValue = jest.fn();
    render(
      <SelectList type="single" onChangeValue={handleChangeValue}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
      </SelectList>
    );

    const item1 = screen.getByText('Item 1');
    item1.click();

    expect(handleChangeValue).toHaveBeenCalledWith('1');
  });

  it('should call onChangeValue when items are selected in multiple mode', () => {
    const handleChangeValue = jest.fn();
    render(
      <SelectList type="multiple" onChangeValue={handleChangeValue}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
      </SelectList>
    );

    const item1 = screen.getByText('Item 1');
    item1.click();
    expect(handleChangeValue).toHaveBeenCalledWith('1');

    const item2 = screen.getByText('Item 2');
    item2.click();
    expect(handleChangeValue).toHaveBeenCalledTimes(2);
  });

  it('should deselect an item in multiple mode', () => {
    const handleChangeValue = jest.fn();
    render(
      <SelectList type="multiple" defaultValue={['1', '2']} onChangeValue={handleChangeValue}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
      </SelectList>
    );

    const item1 = screen.getByText('Item 1');
    item1.click();

    expect(handleChangeValue).toHaveBeenCalledWith('1');
  });

  it('should render with default value in single mode', () => {
    render(
      <SelectList type="single" defaultValue="1" onChangeValue={() => {}}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
      </SelectList>
    );

    const item1Button = screen.getByText('Item 1').closest('button');
    expect(item1Button).toHaveClass('bg-purple-500/5');
  });

  it('should render with default values in multiple mode', () => {
    render(
      <SelectList type="multiple" defaultValue={['1', '2']} onChangeValue={() => {}}>
        <SelectItem value="1" label="Item 1" />
        <SelectItem value="2" label="Item 2" />
        <SelectItem value="3" label="Item 3" />
      </SelectList>
    );

    const item1Button = screen.getByText('Item 1').closest('button');
    const item2Button = screen.getByText('Item 2').closest('button');
    const item3Button = screen.getByText('Item 3').closest('button');

    expect(item1Button).toHaveClass('bg-purple-500/5');
    expect(item2Button).toHaveClass('bg-purple-500/5');
    expect(item3Button).not.toHaveClass('bg-purple-500/5');
  });

  it('should call onClick on SelectItem when provided', () => {
    const handleItemClick = jest.fn();
    render(
      <SelectList type="single" onChangeValue={() => {}}>
        <SelectItem value="1" label="Item 1" onClick={handleItemClick} />
      </SelectList>
    );

    const item1 = screen.getByText('Item 1');
    item1.click();

    expect(handleItemClick).toHaveBeenCalledTimes(1);
  });

  it('should render SelectItem with description, prefix, suffix, and tag', () => {
    render(
      <SelectList type="single" onChangeValue={() => {}}>
        <SelectItem
          value="1"
          label="Item 1"
          description="Description for Item 1"
          prefix={<span>Prefix</span>}
          suffix={<span>Suffix</span>}
          tag={<span>Tag</span>}
        />
      </SelectList>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description for Item 1')).toBeInTheDocument();
    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });
});
