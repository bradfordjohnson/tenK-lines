import difPy
from multiprocessing import freeze_support

# returns similar images and stats of the search
img_dir = 'pics'

if __name__ == '__main__':
    freeze_support()
    dif = difPy.build(img_dir)
    search = difPy.search(dif)
    print(search.result)
    print(search.stats)
