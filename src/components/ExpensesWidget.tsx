import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Home, ShoppingCart, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface Expense {
  name: string;
  amount: number;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  percentage: number;
}

interface ExpensesWidgetProps {
  isDialogOpen: boolean;
  onDialogClose: () => void;
}

const expenseCategories = [
  { name: 'Rent', icon: Home },
  { name: 'Utilities', icon: Zap },
  { name: 'Groceries', icon: ShoppingCart },
  { name: 'Other', icon: DollarSign },
];

const categoryColors = ['#ff2d95', '#ff6bb5', '#ffa0d0', '#ff8cc5'];

export function ExpensesWidget({ isDialogOpen, onDialogClose }: ExpensesWidgetProps) {
  const [expenses, setExpenses] = useState<Expense[]>([
    { name: 'Rent', amount: 1800, icon: Home, color: '#ff2d95', percentage: 60 },
    { name: 'Utilities', amount: 350, icon: Zap, color: '#ff6bb5', percentage: 12 },
    { name: 'Groceries', amount: 840, icon: ShoppingCart, color: '#ffa0d0', percentage: 28 },
  ]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const chartData = expenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
    color: expense.color,
  }));

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const categoryData = expenseCategories.find((c) => c.name === newExpense.category);
      if (!categoryData) return;

      const amount = parseFloat(newExpense.amount);
      const existingExpenseIndex = expenses.findIndex((e) => e.name === newExpense.category);

      if (existingExpenseIndex >= 0) {
        // Update existing expense
        const updatedExpenses = [...expenses];
        updatedExpenses[existingExpenseIndex].amount += amount;
        const newTotal = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
        updatedExpenses.forEach((e) => {
          e.percentage = Math.round((e.amount / newTotal) * 100);
        });
        setExpenses(updatedExpenses);
      } else {
        // Add new expense
        const colorIndex = expenses.length % categoryColors.length;
        const newExpenseItem: Expense = {
          name: newExpense.category,
          amount,
          icon: categoryData.icon,
          color: categoryColors[colorIndex],
          percentage: 0,
        };
        const updatedExpenses = [...expenses, newExpenseItem];
        const newTotal = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
        updatedExpenses.forEach((e) => {
          e.percentage = Math.round((e.amount / newTotal) * 100);
        });
        setExpenses(updatedExpenses);
      }

      setNewExpense({ category: '', amount: '' });
      onDialogClose();
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl p-6 h-full"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="text-[var(--neon-pink)]" size={24} />
          <h2 className="text-white">Shared Expenses</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {expenses.map((expense, index) => {
              const Icon = expense.icon;
              return (
                <motion.div
                  key={expense.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="relative p-4 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${expense.color}20, ${expense.color}10)`,
                    border: `1px solid ${expense.color}40`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${expense.color}30, transparent)`,
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          background: `${expense.color}30`,
                          boxShadow: `0 0 20px ${expense.color}40`,
                        }}
                      >
                        <Icon style={{ color: expense.color }} size={20} />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">{expense.name}</p>
                        <p className="text-white text-xl">${expense.amount}</p>
                      </div>
                    </div>

                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: `${expense.color}20`,
                        color: expense.color,
                      }}
                    >
                      {expense.percentage}%
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--neon-pink)30, var(--neon-pink)10)',
                border: '2px solid var(--neon-pink)',
                boxShadow: '0 0 30px var(--neon-pink-glow)',
              }}
            >
              <p className="text-white/70 text-sm mb-1">Total Monthly</p>
              <p className="text-white text-3xl">${total.toLocaleString()}</p>
              <p className="text-white/50 text-sm mt-1">
                ${(total / 3).toFixed(2)} per person
              </p>
            </motion.div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-full h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(20, 20, 30, 0.9)',
                      border: '1px solid rgba(255, 45, 149, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                    }}
                    formatter={(value: number) => `$${value}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add Expense</DialogTitle>
            <DialogDescription className="text-white/70">
              Add a new shared expense to track with your roommates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select
              value={newExpense.category}
              onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {expenseCategories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
            <Button
              onClick={addExpense}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Add Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
