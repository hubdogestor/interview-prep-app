import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'John Doe',
    placeholder: 'Name',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="email@example.com" />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="email-error">Email</Label>
      <Input
        type="email"
        id="email-error"
        placeholder="email@example.com"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">Email inválido</p>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="grid w-[350px] gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Seu nome completo" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email-form">Email</Label>
        <Input type="email" id="email-form" placeholder="email@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone">Telefone</Label>
        <Input type="tel" id="phone" placeholder="(11) 99999-9999" />
      </div>
    </div>
  ),
}
