import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FormField } from './form-field'
import { Input } from './input'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Mark field as required',
    },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Nome',
    htmlFor: 'name',
    children: <Input id="name" placeholder="Digite seu nome" />,
  },
}

export const Required: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    required: true,
    children: <Input id="email" type="email" placeholder="email@example.com" />,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Senha',
    htmlFor: 'password',
    hint: 'Mínimo de 8 caracteres',
    children: <Input id="password" type="password" placeholder="Digite sua senha" />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email-error',
    required: true,
    error: 'Email inválido. Por favor, verifique o formato.',
    children: <Input id="email-error" type="email" placeholder="email@example.com" />,
  },
}

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    success: 'Username disponível!',
    children: <Input id="username" placeholder="escolha_um_username" />,
  },
}

export const TextareaField: Story = {
  args: {
    label: 'Descrição',
    htmlFor: 'description',
    required: true,
    hint: 'Descreva sua experiência em detalhes',
    children: <Textarea id="description" placeholder="Digite aqui..." />,
  },
}

export const FormExample: Story = {
  args: {
    label: 'Example',
    htmlFor: 'example',
    children: <Input id="example" />,
  },
  render: () => (
    <div className="w-[400px] space-y-4">
      <FormField label="Título" htmlFor="title" required>
        <Input id="title" placeholder="Digite o título" />
      </FormField>
      <FormField
        label="Categoria"
        htmlFor="category"
        hint="Escolha a categoria mais adequada"
      >
        <Input id="category" placeholder="ex: Technical, Leadership" />
      </FormField>
      <FormField
        label="Descrição"
        htmlFor="desc"
        required
        hint="Mínimo de 50 caracteres"
      >
        <Textarea id="desc" placeholder="Descreva em detalhes..." />
      </FormField>
    </div>
  ),
}

export const ValidationStates: Story = {
  args: {
    label: 'Validation',
    htmlFor: 'validation',
    children: <Input id="validation" />,
  },
  render: () => (
    <div className="w-[400px] space-y-6">
      <FormField
        label="Campo Normal"
        htmlFor="normal"
        hint="Este é um campo sem validação"
      >
        <Input id="normal" placeholder="Digite algo" />
      </FormField>
      <FormField label="Campo com Erro" htmlFor="error" error="Este campo é obrigatório">
        <Input id="error" placeholder="Campo vazio" />
      </FormField>
      <FormField
        label="Campo com Sucesso"
        htmlFor="success"
        success="Dados salvos com sucesso!"
      >
        <Input id="success" value="Dados válidos" />
      </FormField>
    </div>
  ),
}
