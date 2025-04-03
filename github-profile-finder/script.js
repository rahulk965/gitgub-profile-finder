async function fetchProfile() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
    const errorDiv = document.getElementById('error');
    
    profileDiv.style.display = 'none';
    errorDiv.innerText = '';
    
    if (!username) {
        errorDiv.innerText = 'Please enter a GitHub username';
        return;
    }
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        
        profileDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.name}" class="avatar">
            <h2>${data.name || 'No Name'}</h2>
            <p>${data.bio || 'No bio available'}</p>
            <p><strong>Repos:</strong> ${data.public_repos} | <strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
        `;
        profileDiv.style.display = 'block';
    } catch (error) {
        errorDiv.innerText = error.message;
    }
}
