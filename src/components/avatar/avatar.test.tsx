import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  const defaultProps = {
    imageUrl: 'https://res.cloudinary.com/pingback/image/upload/q_60,c_thumb/imgs/user/193752/gallery/h2erjr6lfzkbmy7rnai2'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with fallback', () => {
    render(<Avatar {...defaultProps} fallback="P" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('P');
    });
  });

  it('renders correctly with default props', () => {
    render(<Avatar {...defaultProps} />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-image')).toHaveAttribute('src', defaultProps.imageUrl);
      expect(screen.getByTestId('avatar-image')).toHaveAttribute('alt', 'Avatar');
    });
    expect(screen.getByTestId('avatar-root')).toHaveClass('border-[4px]');
  });

  it('renders correctly with small size', () => {
    render(<Avatar {...defaultProps} size="small" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('w-6 h-6 text-[8px]');
      expect(screen.getByTestId('avatar-root')).toHaveClass('border-none');
    });
  });

  it('renders correctly with medium size', () => {
    render(<Avatar {...defaultProps} size="medium" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('w-8 h-8 text-xs');
      expect(screen.getByTestId('avatar-root')).toHaveClass('border-[2px]');
    });
  });

  it('renders correctly with gray type', () => {
    render(<Avatar {...defaultProps} type="gray" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-gray-200 text-gray-800');
    });
  });

  it('renders correctly with brown type', () => {
    render(<Avatar {...defaultProps} type="brown" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-brown-200 text-brown-800');
    });
  });

  it('renders correctly with red type', () => {
    render(<Avatar {...defaultProps} type="red" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-red-200 text-red-800');
    });
  });

  it('renders correctly with orange type', () => {
    render(<Avatar {...defaultProps} type="orange" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-orange-200 text-orange-800');
    });
  });

  it('renders correctly with yellow type', () => {
    render(<Avatar {...defaultProps} type="yellow" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-yellow-200 text-yellow-800');
    });
  });

  it('renders correctly with lime type', () => {
    render(<Avatar {...defaultProps} type="lime" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-lime-200 text-lime-900');
    });
  });

  it('renders correctly with green type', () => {
    render(<Avatar {...defaultProps} type="green" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-green-200 text-green-800');
    });
  });

  it('renders correctly with mint type', () => {
    render(<Avatar {...defaultProps} type="mint" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-mint-200 text-mint-900');
    });
  });

  it('renders correctly with teal type', () => {
    render(<Avatar {...defaultProps} type="teal" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-teal-200 text-teal-800');
    });
  });

  it('renders correctly with cyan type', () => {
    render(<Avatar {...defaultProps} type="cyan" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-cyan-200 text-cyan-900');
    });
  });

  it('renders correctly with blue type', () => {
    render(<Avatar {...defaultProps} type="blue" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-blue-200 text-blue-900');
    });
  });

  it('renders correctly with purple type', () => {
    render(<Avatar {...defaultProps} type="purple" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-purple-200 text-purple-900');
    });
  });

  it('renders correctly with fuchsia type', () => {
    render(<Avatar {...defaultProps} type="fuchsia" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-fucshia-200 text-fucshia-900');
    });
  });

  it('renders correctly with pink type', () => {
    render(<Avatar {...defaultProps} type="pink" />);
    waitFor(() => {
      expect(screen.getByTestId('avatar-root')).toHaveClass('bg-pink-200 text-pink-800');
    });
  });
});
