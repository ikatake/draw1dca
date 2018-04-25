#!bin/ruby
require 'chunky_png'

def get_next_state(rule, left, center, right)
  num = (left * 4 + center * 2 + right)
#	p num
  b = (rule >> num) % 2
#	p b
end

def get_next_states(rule, cells, width)
  next_cells = Array.new(width, 0)
  width.times do |i|
    left = cells[ (i - 1) % width ]
    center = cells[i]
    right = cells[ (i + 1) % width ]
    next_cells[i] = get_next_state(rule, left, center, right)
  end
  width.times do |i|
    cells[i] = next_cells[i]
  end
end

def draw_line(png, cells, y, forecolor)
  cells.length.times do |x|
    if(cells[x] == 1)
      png.set_pixel(x, y, forecolor)
    end
  end
end

# if(ARGV.length < 3)
# {
#   puts "usage: draw1dca.ruby rule_num #_of_gene (color) (file_name)"
# }

max_gene = 900
width = max_gene * 2 + 1
file_name = "./rule.png"

png = ChunkyPNG::Image.new(width, max_gene + 1)
color = ChunkyPNG::Color.from_hex("0xffffff")
	p color
cells = Array.new(width, 0)
cells[max_gene] = 1
rule = 30
max_gene.times do |i|
  draw_line(png, cells, i, color)
  get_next_states(rule, cells, width)
end
  draw_line(png, cells, max_gene, color)

png.save(file_name)

