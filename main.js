window.addEventListener('load', () => {
    // Memuat data to-do dari localStorage atau inisialisasi sebagai array kosong
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Memilih elemen HTML dengan id 'name' dan 'new-todo-form'
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // Mendapatkan atau menginisialisasi nilai 'username' dari localStorage
    const username = localStorage.getItem('username') || '';

    // Mengatur nilai input dengan id 'name' sesuai dengan 'username'
    nameInput.value = username;

    // Menambahkan event listener untuk mengubah nilai 'username' ketika input 'name' berubah
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    // Menambahkan event listener untuk form 'new-todo-form' untuk menangani submit
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        // Membuat objek 'todo' dari nilai formulir dan menambahkannya ke array 'todos'
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        // Menyimpan array 'todos' kembali ke localStorage setelah ditambahkan todo baru
        localStorage.setItem('todos', JSON.stringify(todos));

        // Mereset formulir setelah todo ditambahkan dan menampilkan ulang todos
        e.target.reset();
        DisplayTodos();
    })

    // Menampilkan todos saat halaman dimuat
    DisplayTodos();
})


function DisplayTodos () {
	// Memilih elemen HTML dengan id 'todo-list'
	const todoList = document.querySelector('#todo-list');
	// Mengosongkan isi HTML dari elemen 'todo-list'
	todoList.innerHTML = "";

	// Iterasi melalui setiap objek 'todo' dalam array 'todos'
	todos.forEach(todo => {
		// Membuat elemen HTML untuk setiap 'todo'
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		// Membuat elemen-elemen HTML untuk tampilan detail todo
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		// Membuat elemen checkbox untuk menandai status 'done' pada todo
		input.type = 'checkbox';
		input.checked = todo.done;

		// Membuat elemen span sebagai elemen dekoratif untuk checkbox
		span.classList.add('bubble');

		
		// Menentukan kategori todo dan menambahkan kelas sesuai kategori
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}

		// Membuat elemen untuk menampilkan konten todo (teks)
		content.classList.add('todo-content');
		// Membuat elemen div untuk menyimpan tombol edit dan delete
		actions.classList.add('actions');
		// Membuat tombol edit dan delete
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		// Menetapkan nilai dan properti untuk elemen konten todo
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

		// Menetapkan teks untuk tombol edit dan delete
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		// Menyusun elemen-elemen untuk satu todo
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		// Menambahkan todoItem ke dalam todoList (elemen HTML dengan id 'todo-list')
		todoList.appendChild(todoItem);

		// Jika todo sudah selesai (done), tambahkan kelas 'done' untuk memberikan stiling berbeda
		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		// Menambahkan event listener untuk checkbox, tombol edit, dan tombol delete
		input.addEventListener('change', (e) => {
			// Mengubah status 'done' dan menyimpan perubahan ke localStorage
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			// Menambah atau menghapus kelas 'done' sesuai dengan status 'done'
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			// Menampilkan ulang todos setelah perubahan
			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			// Mengaktifkan pengeditan dan menyimpan perubahan setelah input blur
            // Menampilkan ulang todos setelah perubahan
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			// Menghapus todo dari array 'todos' dan menyimpan perubahan ke localStorage
            // Menampilkan ulang todos setelah perubahan
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}