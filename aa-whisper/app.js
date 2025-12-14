// =====================================================================================================================================================================
// aa-whisper
// =====================================================================================================================================================================
// Made by aa using ai
// =====================================================================================================================================================================

document.addEventListener('DOMContentLoaded', function() {
    // ====================================================================================================
    // FIREBASE INITIALIZATION
    // ====================================================================================================
    
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDju8FmvZmgT6Subk2D7StKW_tzV5oKdao",
        authDomain: "aa-whisper.firebaseapp.com",
        databaseURL: "https://aa-whisper-default-rtdb.firebaseio.com",
        projectId: "aa-whisper",
        storageBucket: "aa-whisper.appspot.com",
        messagingSenderId: "996959903815",
        appId: "1:996959903815:web:065f98c97fa713315d5162",
        measurementId: "G-1HP9YSMHD8"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();

    // Initialize Firebase Storage with error handling
    let storage;
    try {
        storage = firebase.storage();
        console.log("🔥✔️ Firebase Storage initialized");
    } catch (error) {
        console.error("🔥❌ Firebase Storage initialization failed:", error);
        console.log("Make sure you've included the Firebase Storage script in your HTML");
        
        // Disable image upload UI if Storage is not available
        const uploadElements = [
            'image-upload-btn',
            'image-input',
            'image-preview-container'
        ];
        
        uploadElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Set auth persistence
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            console.log("📎✔️ Auth persistence set to LOCAL.");
        })
        .catch((error) => {
            console.error("📎❌ Error setting auth persistence:", error);
        });

    // ====================================================================================================
    // GLOBAL VARIABLES AND STATE MANAGEMENT
    // ====================================================================================================
    
    console.log("%c welcome to whisper! ", 'font-size: 30px; background: linear-gradient(135deg, #1a1a2e, #32264a); border: 1px solid #fff; border-radius: 30px; font-weight: 1000;');
    
    // DOM elements
    const authContainer = document.getElementById('auth-container');
    const appMain = document.getElementById('app-main');
    const guestTab = document.getElementById('guest-tab');
    const accountTab = document.getElementById('account-tab');
    const guestPanel = document.getElementById('guest-panel');
    const accountPanel = document.getElementById('account-panel');
    const signupPanel = document.getElementById('signup-panel');
    const usernamePanel = document.getElementById('username-panel');
    const guestUsername = document.getElementById('guest-username');
    const guestLoginBtn = document.getElementById('guest-login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const displayName = document.getElementById('display-name');
    const signupBtn = document.getElementById('signup-btn');
    const chooseUsername = document.getElementById('choose-username');
    const setUsernameBtn = document.getElementById('set-username-btn');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const roomList = document.getElementById('room-list');
    const newRoomName = document.getElementById('new-room-name');
    const userList = document.getElementById('user-list');
    const currentRoomName = document.getElementById('current-room-name');
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const recordVoiceBtn = document.getElementById('record-voice-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const refreshUsersBtn = document.getElementById('refresh-users-btn');
    const recentChatsList = document.getElementById('recent-chats-list');
    const startNewChatBtn = document.getElementById('start-new-chat-btn');
    const newChatModal = document.getElementById('new-chat-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const openNewRoomModalBtn = document.getElementById('open-new-room-modal-btn');
    const newRoomModal = document.getElementById('new-room-modal');
    const closeNewRoomModalBtn = document.getElementById('close-new-room-modal-btn');
    const newRoomNameModal = document.getElementById('new-room-name-modal');
    const newRoomErrorMessage = document.getElementById('new-room-error-message');
    const searchUserInput = document.getElementById('search-user-input');
    const searchResults = document.getElementById('search-results');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    // Admin-specific DOM elements
    const adminPanel = document.getElementById('admin-section');
    const banUserBtn = document.getElementById('ban-user-btn');
    const unbanUserBtn = document.getElementById('unban-user-btn');
    const adminUserSelect = document.getElementById('admin-user-select');
    const adminReasonInput = document.getElementById('admin-reason-input');
    const adminActionMessage = document.getElementById('admin-action-message');
    
    // Leader-specific DOM elements
    const grantAdminBtn = document.getElementById('grant-admin-btn');
    const revokeAdminBtn = document.getElementById('revoke-admin-btn')
    
    // Image upload elements
    const imageInput = document.getElementById('image-input');
    const uploadBtn = document.getElementById('image-upload-btn');
    const previewContainer = document.getElementById('image-preview-container');
    const cancelBtn = document.getElementById('cancel-image-btn');
    const imagePreview = document.getElementById('image-preview');
    const imageName = document.getElementById('image-name');
    const imageSize = document.getElementById('image-size');
    
    // Call elements
    const incomingCallModal = document.getElementById('incoming-call-modal');
    const acceptCallBtn = document.getElementById('accept-call-btn');
    const rejectCallBtn = document.getElementById('reject-call-btn');
    const toggleVideoBtn = document.getElementById('toggle-video-btn');
    const toggleMicBtn = document.getElementById('toggle-mic-btn');
    const toggleScreenShareBtn = document.getElementById('toggle-screen-share-btn');
    const endCallBtn = document.getElementById('end-call-btn');
    const callUserName = document.getElementById('call-user-name');
    const callTimer = document.getElementById('call-timer');
    const callStatus = document.getElementById('call-status');
    const incomingCallUserName = document.getElementById('incoming-call-user-name');
    const incomingCallAvatar = document.getElementById('incoming-call-avatar');
    const incomingCallType = document.getElementById('incoming-call-type');
    
    // Tab elements
    const appTabs = document.querySelectorAll('.app-tab');
    const chatTab = document.getElementById('chat-tab');
    const callsTab = document.getElementById('calls-tab');
    const chatArea = document.getElementById('chat-area');
    const callArea = document.getElementById('call-area');
    const activeCallsList = document.getElementById('active-calls-list');
    const recentCallsList = document.getElementById('recent-calls-list');
    const noCallsMessage = document.getElementById('no-calls-message');
    const noPeopleMessage = document.getElementById('no-people-message');
    const peopleToCallList = document.getElementById('people-to-call-list');
    
    // State variables
    let currentUser = null;
    let currentRoom = 'general';
    let isTyping = false;
    let typingTimer = null;
    let privateChatUser = null;
    let heartbeatInterval = null;
    let recentChats = [];
    let collapsedSections = {};
    let allUsers = {};
    let bannedUsers = {};
    let adminUsers = {};
    let messagesRef = null;
    let replyingTo = null;
    let loadingTasks = 0;
    let messagesCallback = null;
    let currentMessagesRef = null;
    let usersValueCallback = null;
    let selectedImage = null;
    let isUploading = false;
    let isRecording = false;
    let mediaRecorder = null;
    let audioChunks = []; 
    let localStream = null;
    let remoteStream = null;
    let localVideo = document.getElementById('local-video');
    let remoteVideo = document.getElementById('remote-video');
    let screenShareVideo = document.getElementById('screen-share-video');
    let peerConnection = null;
    let currentCall = null;
    let callTimerInterval = null;
    let isInitialized = false;
    let callStartTime = null;
    let isCallActive = false;
    let incomingCallData = null;
    let isScreenSharing = false;
    let screenShareStream = null;
    let recentCalls = [];
    let activeTab = 'chat';
    let callSignalingRef = null;

    // ====================================================================================================
    // UTILITY FUNCTIONS
    // ====================================================================================================
    
    // Structured logging helper with optional color-coding
    function log(message, level = 0, feature = null) {
        const indent = '    '.repeat(level);
        let color = 'inherit'; // default color
        let borderLeft = 'transparent'; // default border
        
        // Assign colors based on feature
        if (feature === 'auth') {
            color = '#3498db'; 
            borderLeft = '#3498db', '3px'; // Blue
        }
        if (feature === 'admin') {
            color = '#9b59b6'; 
            borderLeft = '#9b59b6', '3px'; // Purple
        }
        if (feature === 'message') {
            color = '#2ecc71'; 
            borderLeft = '#2ecc71', '3px'; // Green
        }
        if (feature === 'ban') {
            color = '#e74c3c'; 
            borderLeft = '#e74c3c', '3px'; // Red
        }
        if (feature === 'user') {
            color = '#f39c12'; 
            borderLeft = '#f39c12', '3px'; // Orange
        }
        if (feature === 'call') {
            color = '#00bcd4'; 
            borderLeft = '#00bcd4', '3px'; // Cyan
        }
        
        // Use %c for styling in the console
        console.log(`%c${indent}${message}`, `color: ${color}; font-weight: bold; border-left: 3px solid ${borderLeft}; padding-left: 5px;`);
    }
    
    // Sound effect for new messages when tab is inactive
    function isTabActive() {
        return !document.hidden;
    }
    
    // Timestamp formatting
    function formatTimestamp(timestamp) {
        if (!timestamp) return 'Unknown';
        
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    // Simple date format
    function formatShortDate(date) {
        const messageDate = new Date(date);
        const today = new Date();
        
        if (messageDate.toDateString() === today.toDateString()) {
            return 'Today';
        }
        
        return messageDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Format timestamp to readable time
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Helper function to set a button's loading state
    function setButtonLoading(buttonElement, isLoading) {
        if (!buttonElement) return; // Added: Null check
        
        if (isLoading) {
            // Save original text and disable the button
            buttonElement.dataset.originalText = buttonElement.textContent;
            buttonElement.disabled = true;
            buttonElement.classList.add('button-loading');
            
            // Clear the button and add the spinner
            buttonElement.innerHTML = '<span class="spinner"></span>';
        } else {
            // Restore the original text and re-enable the button
            buttonElement.disabled = false;
            buttonElement.classList.remove('button-loading');
            buttonElement.textContent = buttonElement.dataset.originalText;
        }
    }

    // Check if current user is an admin
    function isCurrentUserAdmin() {
        return currentUser && (adminUsers[currentUser.uid] || isCurrentUserLeader());
    }

    // Check if current user is a leader
    function isCurrentUserLeader() {
        return currentUser && window.leaderIds && window.leaderIds[currentUser.uid];
    }

    // Check if a user is banned
    function isUserBanned(userId) {
        return bannedUsers[userId];
    }

    // Show admin notification
    function showAdminNotification(message, type = 'info') {
        if (!adminActionMessage) return;
        
        adminActionMessage.textContent = message;
        adminActionMessage.className = `admin-notification ${type}`;
        adminActionMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            adminActionMessage.style.display = 'none';
        }, 5000);
    }

    // Refresh users in admin user selection
    function updateAdminUserSelect() {
        if (!adminUserSelect) return;
        
        // Clear existing options
        adminUserSelect.innerHTML = '';
        
        // Add default "Select User" option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'pick one..';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        adminUserSelect.appendChild(defaultOption);
        
        // 1. Create an array from the users object
        const usersArray = [];
        Object.keys(allUsers).forEach(userId => {
            if (userId === currentUser.uid) return; // Don't add yourself
            
            const user = allUsers[userId];
            if (!user) return;
            
            usersArray.push({
                userId: userId,
                displayName: user.displayName || 'Unknown User',
                isAdmin: adminUsers[userId],
                isBanned: bannedUsers[userId],
                isLeader: window.leaderIds && window.leaderIds[userId]
            });
        });
        
        // 2. Sort the array alphabetically by displayName
        usersArray.sort((a, b) => a.displayName.localeCompare(b.displayName));
        
        // 3. Add the sorted users to the dropdown
        usersArray.forEach(user => {
            const option = document.createElement('option');
            option.value = user.userId;
            
            // Build the display text with indicators
            let displayText = user.displayName;
            if (user.isLeader) {
                displayText += ' (Leader)';
            } else if (user.isAdmin) {
                displayText += ' (Admin)';
            }
            if (user.isBanned) {
                displayText += ' (Banned)';
            }
            
            option.textContent = displayText;
            adminUserSelect.appendChild(option);
        });
    }

    // Refresh users
    function addRefreshIconAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes admin-refresh-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .admin-section .refresh-icon.spinning {
                animation: admin-refresh-spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Call this function once when the page loads
    addRefreshIconAnimation();

    async function refreshUsersList() {
        try {
            log("👥📋 Refreshing users list...", 0);
            
            // Show loading state
            const refreshBtn = document.getElementById('refresh-admin-users-btn');
            if (refreshBtn) {
                refreshBtn.disabled = true;
                refreshBtn.querySelector('.refresh-icon').classList.add('spinning');
            }
            
            // Reload users from database
            await loadUsers();
            
            // Update UI
            updateAdminUserSelect();
            loadContactsList();
            
            notifications.success("users list refreshed, bro.", 'success', 3000);
        } catch (error) {
            console.error("👥📋❌ Error refreshing users list:", error);
            notifications.error("couldn't refresh users list, bro.", 'error', 5000);
        } finally {
            // Reset loading state
            const refreshBtn = document.getElementById('refresh-admin-users-btn');
            if (refreshBtn) {
                refreshBtn.disabled = false;
                refreshBtn.querySelector('.refresh-icon').classList.remove('spinning');
            }
        }
    }

    // Add this CSS animation for the refresh icon
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ====================================================================================================
    // IN-APP NOTIFICATION SYSTEM
    // ====================================================================================================
    
    class NotificationSystem {
        constructor() {
            this.container = document.getElementById('notification-container');
            this.notifications = [];
            this.maxNotifications = 5;
        }

        show(message, type = 'info', title = null, duration = 4000) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`; // e.g., "notification success"
            
            // This HTML structure is CRITICAL for the CSS to work
            notification.innerHTML = `
                <div class="notification-icon"></div>
                <div class="notification-content">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">×</button>
            `;
            
            // Add to container
            this.container.appendChild(notification);
            
            // Limit number of notifications
            if (this.notifications.length >= this.maxNotifications) {
                const oldest = this.notifications.shift();
                this.remove(oldest);
            }
            
            this.notifications.push(notification);
            
            // Show notification with animation
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Auto-dismiss
            if (duration > 0) {
                setTimeout(() => {
                    this.remove(notification);
                }, duration);
            }
            
            // Close button
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                this.remove(notification);
            });
            
            // Click to dismiss
            notification.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification-close')) {
                    this.remove(notification);
                }
            });
            
            return notification;
        }
        
        remove(notification) {
            if (!notification || !notification.parentNode) return;
            
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 300);
        }
        
        // Convenience methods
        success(message, title = null, duration = 4000) {
            return this.show(message, 'success', title, duration);
        }
        
        error(message, title = null, duration = 6000) {
            return this.show(message, 'error', title, duration);
        }
        
        warning(message, title = null, duration = 5000) {
            return this.show(message, 'warning', title, duration);
        }
        
        info(message, title = null, duration = 4000) {
            return this.show(message, 'info', title, duration);
        }
        
        // Clear all notifications
        clear() {
            this.notifications.forEach(notification => {
                this.remove(notification);
            });
            this.notifications = [];
        }
    }
    
    // Create global notification instance
    const notifications = new NotificationSystem();

    // ====================================================================================================
    // BAN NOTIFICATION FUNCTIONS
    // ====================================================================================================
    
    function showBannedNotification(reason) {
        console.log("👥🚫 showBannedNotification called with reason:", reason);
        
        const notification = document.getElementById('banned-notification');
        const reasonText = document.getElementById('ban-reason-text');
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');

        if (notification) {
            notification.style.display = 'flex'; // Force display to flex
            notification.classList.add('show');
            notification.classList.add('animated-bg'); 
            if (reason && reasonText) {
                reasonText.textContent = `Reason: ${reason}`;
            }
            console.log("👥🚫✅ Notification element made visible.");
        } else {
            console.error("👥🚫❌ Banned notification element not found.");
        }

        if (messageInput) messageInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
        
        const messageInputContainer = document.getElementById('message-input-container');
        if (messageInputContainer) {
            messageInputContainer.classList.add('banned-state');
        }
    }

    function hideBannedNotification() {
        console.log("👥✔️ hideBannedNotification called");
        
        const notification = document.getElementById('banned-notification');
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');

        if (notification) {
            notification.style.display = 'none'; // Force display to none
            notification.classList.remove('show');
            notification.classList.remove('animated-bg'); 
            console.log("👥✔️✅ Notification element hidden");
        }

        if (messageInput) messageInput.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        
        const messageInputContainer = document.getElementById('message-input-container');
        if (messageInputContainer) {
            messageInputContainer.classList.remove('banned-state');
        }
    }
    
    async function isCurrentUserBanned() {
        if (!currentUser) return false;
        
        try {
            const banSnapshot = await database.ref('bannedUsers/' + currentUser.uid).once('value');
            return banSnapshot.exists();
        } catch (error) {
            console.error("👥🚫❔ Error checking ban status:", error);
            return false;
        }
    }

    // ====================================================================================================
    // ROLE MANAGEMENT FUNCTIONS
    // ====================================================================================================

    // Load role data (leaders and admins)
    async function loadRoleData() {
        log("👤👮/👑❔ Loading role data...", bannedUsers, 0, 'admin');
        
        // 1. Initial check: if no user, do nothing.
        if (!currentUser) {
            console.log("👤👮❎ No user to load role data for. Exiting.");
            return;
        }

        // 2. CRITICAL: Reset state to prevent bleed-over from previous sessions.
        window.leaderIds = null;
        adminUsers = {};
        bannedUsers = {};

        // 3. Load Leaders Data: This is a public read and should always succeed.
        try {
            const leadersSnapshot = await database.ref('roles/leaders').once('value');
            window.leaderIds = leadersSnapshot.val() || {};
            log("ℹ️ Loaded leader IDs:", window.leaderIds, 1, 'admin');
        } catch (error) {
            console.error("👤👮❎ Error loading leader IDs:", error, 0, 'admin');
            // Even if this fails, we can continue. The app will just behave as if there are no leaders.
            window.leaderIds = {};
        }

        // 4. Load Admin Data: This is now a public read for any authenticated user.
        try {
            const adminSnapshot = await database.ref('adminUsers').once('value');
            adminUsers = adminSnapshot.val() || {};
            log("ℹ️ Loaded admin users:", adminUsers, 1, 'admin');
        } catch (error) {
            console.error("👤👮❎ Error loading admin users:", error);
            // If this fails, adminUsers remains an empty object, which is a safe default.
        }

        // 5. Load Banned Data: This is the only part that should be restricted.
        // Only admins or leaders need to see the full ban list for the admin panel.
        const isAdmin = adminUsers[currentUser.uid];
        const isLeader = isCurrentUserLeader();

        if (isAdmin || isLeader) {
            console.log("👤👮ℹ️ 👤=👮/👑 User is admin or leader: loading banned users for admin panel.");
            try {
                const bannedSnapshot = await database.ref('bannedUsers').once('value');
                bannedUsers = bannedSnapshot.val() || {};
                log("ℹ️ 👤🚫✔️ Loaded banned users:", bannedUsers, 2, 'admin');
            } catch (bannedError) {
                console.error("👤👮❎ 👤🚫❌ Error loading banned users:", bannedError);
                if (bannedError.code === 'PERMISSION_DENIED') {
                    notifications.warning("Permission denied accessing banned users. Your Firebase security rules may need updating.", 'Security Rules Warning', 5000);
                }
                bannedUsers = {}; // Default to empty on failure.
            }
        } else {
            console.log("👤👮ℹ️ 👤≠👮/👑 User is not admin or leader. Skipping full ban list load.", 1, 'admin');
        }

        log("✅ Leader IDs:", window.leaderIds, 1, 'admin');
        log("✅ Admin users:", adminUsers, 1, 'admin');
        log("✅ Banned users:", bannedUsers, 1, 'admin');
    }

    // Update UI based on user role
    function updateUserRoleUI() {
        log("👤👮🔄️ Starting to refresh user roles...", 0, 'admin');
        log("ℹ️ Refreshing user role UI: Current user ID:", currentUser.uid, 1, 'admin');
        log("ℹ️ Refreshing user role UI: Admin users:", adminUsers, 1, 'admin');
        log("ℹ️ Refreshing user role UI: Leader IDs:", window.leaderIds, 1, 'admin');
        
        // Remove all role classes first
        document.body.classList.remove('is-leader', 'is-admin');
        
        if (window.leaderIds && window.leaderIds[currentUser.uid]) {
            log("👤=👑 Setting user as LEADER", 2, 'admin');
            document.body.classList.add('is-leader');
            document.body.classList.add('is-admin'); // Leader is also an admin
            
            if (adminPanel) {
                adminPanel.style.display = 'block';
                
                // Show all controls for leader
                document.querySelectorAll('.leader-only').forEach(el => {
                    el.style.display = 'inline-block';
                });
                
                document.querySelectorAll('.admin-only').forEach(el => {
                    el.style.display = 'inline-block';
                });
            }
            
        } else if (adminUsers[currentUser.uid]) {
            log("👤=👮 Setting user as ADMIN", 2, 'admin');
            document.body.classList.add('is-admin');
            
            if (adminPanel) {
                adminPanel.style.display = 'block';
                
                // Show only admin controls, hide leader-only controls
                document.querySelectorAll('.leader-only').forEach(el => {
                    el.style.display = 'none';
                });
                
                document.querySelectorAll('.admin-only').forEach(el => {
                    el.style.display = 'inline-block';
                });
            }
            
            notifications.success('admin privileges confirmed!', 'Authentication', 4000);
        } else {
            log("👤≠👮/👑 Setting user as REGULAR", 2, 'admin');
            // Regular user
            if (adminPanel) {
                adminPanel.style.display = 'none';
            }
        }
        
        // Update admin user select
        if (adminUsers[currentUser.uid] || isCurrentUserLeader()) {
            updateAdminUserSelect();
        }
    }

    // Show user details when selected
    function showUserDetails(userId) {
        if (!userId || !allUsers[userId]) {
            const userInfoDiv = document.getElementById('admin-user-info');
            if (userInfoDiv) userInfoDiv.style.display = 'none';
            return;
        }
        
        const user = allUsers[userId];
        const userInfoDiv = document.getElementById('admin-user-info');
        
        if (!userInfoDiv) return; // Added: Null check
        
        // Update user information
        document.getElementById('info-display-name').textContent = user.displayName || 'Unknown';
        document.getElementById('info-user-type').textContent = user.isGuest ? 'Guest' : 'Registered';
        
        // Status
        let status = 'Active';
        if (bannedUsers[userId]) {
            status = 'Banned';
        } else if (user.disabled) {
            status = 'Disabled';
        }
        document.getElementById('info-status').textContent = status;
        
        // Last seen
        if (user.lastSeen) {
            const lastSeenDate = new Date(user.lastSeen);
            document.getElementById('info-last-seen').textContent = lastSeenDate.toLocaleString();
        } else {
            document.getElementById('info-last-seen').textContent = 'Unknown';
        }
        
        userInfoDiv.style.display = 'block';
    }

    // Show confirmation modal
    function showConfirmModal(title, message, details, onConfirm) {
        const modal = document.getElementById('admin-confirm-modal');
        const titleElement = document.getElementById('confirm-title');
        const messageElement = document.getElementById('confirm-message');
        const detailsElement = document.getElementById('confirm-details');
        const confirmBtn = document.getElementById('confirm-ok-btn');
        const cancelBtn = document.getElementById('confirm-cancel-btn');
        const closeBtn = document.getElementById('confirm-close-btn');
        
        if (!modal || !titleElement || !messageElement || !detailsElement || 
            !confirmBtn || !cancelBtn || !closeBtn) {
            console.error("📦👍/👎❌ Missing modal elements");
            return;
        }
        
        // Set content
        titleElement.textContent = title;
        messageElement.textContent = message;
        
        // Set details if provided
        if (Object.keys(details).length > 0) {
            let detailsHtml = '';
            for (const [key, value] of Object.entries(details)) {
                detailsHtml += `<div><strong>${key}:</strong> ${value}</div>`;
            }
            detailsElement.innerHTML = detailsHtml;
            detailsElement.style.display = 'block';
        } else {
            detailsElement.style.display = 'none';
        }
        
        // Show modal
        modal.style.display = 'block';
        
        // Set up event listeners
        const handleConfirm = () => {
            modal.style.display = 'none';
            onConfirm();
            
            // Remove event listeners
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
            closeBtn.removeEventListener('click', handleCancel);
        };
        
        const handleCancel = () => {
            modal.style.display = 'none';
            
            // Remove event listeners
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
            closeBtn.removeEventListener('click', handleCancel);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        closeBtn.addEventListener('click', handleCancel);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                handleCancel();
            }
        });
    }

    // Ban a user (Admin and Leader can do this)
    function banUser() {
        if (!isCurrentUserAdmin() && !isCurrentUserLeader()) {
            notifications.error("u ain't allowed to do that, bro.", 'access denied', '6000');
            return;
        }
        
        const userId = adminUserSelect.value;
        const reason = adminReasonInput.value.trim();
        
        if (!userId) {
            notifications.warning('u gotta choose a user to ban, bro.', 'action required', '5000');
            return;
        }
        
        if (!reason) {
            notifications.warning('u gotta provide a reason for the ban, bro.', 'action required', '5000');
            return;
        }
        
        // Cannot ban yourself or other admins/leader
        if (userId === currentUser.uid) {
            notifications.error("u can't ban yourself, bro.", 'not allowed', '6000');
            return;
        }
        
        if (adminUsers[userId] || (window.leaderIds && window.leaderIds[userId])) {
            notifications.error("u can't ban an admin or leader, bro.", 'not allowed', '6000');
            return;
        }
        
        // Add user to banned list
        const banData = {
            reason: reason,
            bannedBy: currentUser.uid,
            bannedByName: currentUser.displayName,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        database.ref('bannedUsers/' + userId).set(banData)
            .then(() => {
                // Update local state
                bannedUsers[userId] = banData;
                
                // Update UI
                updateAdminUserSelect();
                loadContactsList();
                
                // Show success message
                notifications.success(`'${allUsers[userId]?.displayName || 'Unknown'}' is now banned, bro.`, 'success', '4000');
                
                // Clear form
                adminReasonInput.value = '';
            })
            .catch(error => {
                console.error("👤🚫 ❌ Error banning user:", error);
                notifications.error("couldn't ban that user, bro. try again.", 'error', '6000');
            });
    }
    
    // Unban a user
    function unbanUser(userId) {
        if (!isCurrentUserAdmin() && !isCurrentUserLeader()) {
            notifications.error("u ain't allowed to do that, bro.", 'access denied', '6000');
            return;
        }
        
        if (!userId) {
            notifications.warning('u gotta select a user to unban, bro.', 'action required', '5000');
            return;
        }
        
        if (!bannedUsers[userId]) {
            notifications.error("that user ain't banned, bro.", 'not banned', '6000');
            return;
        }
        
        // Remove user from banned list
        database.ref('bannedUsers/' + userId).remove()
            .then(() => {
                // Update local state
                delete bannedUsers[userId];
                
                // Update UI
                updateAdminUserSelect();
                loadContactsList();
                
                // Show success message
                notifications.success(`'${allUsers[userId]?.displayName || 'Unknown'}' is now unbanned, bro.`, 'user unbanned', '4000');
            })
            .catch(error => {
                console.error("👤✔️ ❌ Error unbanning user:", error);
                notifications.error("couldn't unban that user, bro. try again.", 'error', '6000');
            });
    }

    // Grant admin privileges (Leader only)
    function grantAdmin() {
        if (!isCurrentUserLeader()) {
            notifications.error('only leaders can grant admin privileges, bro.', 'access denied', '6000');
            return;
        }
        
        const userId = adminUserSelect.value;
        
        if (!userId) {
            notifications.warning('u gotta select a user to grant admin privileges, bro.', 'action required', '5000');
            return;
        }
        
        if (adminUsers[userId]) {
            notifications.error('that user already has admin privileges, bro.', 'already admin', '6000');
            return;
        }
        
        // Add user to admin list
        database.ref('adminUsers/' + userId).set(true)
            .then(() => {
                // Update local state
                adminUsers[userId] = true;
                
                // Update UI
                updateAdminUserSelect();
                loadContactsList();
                
                // Show success message
                notifications.success("admin privileges granted to '${allUsers[userId]?.displayName || 'Unknown'}', bro.", 'admin granted', '4000');
            })
            .catch(error => {
                console.error("👤➡️👮 ❌ Error granting admin:", error);
                notifications.error("couldn't grant admin privileges, bro. try again.", 'error', '6000');
            });
    }

    // Revoke admin privileges (Leader only)
    function revokeAdmin() {
        if (!isCurrentUserLeader()) {
            notifications.error('👮➡️👤 ❎ 👤≠👑 only leaders can revoke admin privileges, bro.', 'access denied', '6000');
            return;
        }
        
        const userId = adminUserSelect.value;
        
        if (!userId) {
            notifications.warning('u gotta select a user to revoke admin privileges from, bro.', 'action required', '5000');
            return;
        }
        
        if (!adminUsers[userId]) {
            notifications.error("that user don't got admin privileges, bro.", 'error', '6000');
            return;
        }
        
        // Cannot revoke admin from yourself if you're the leader
        if (userId === currentUser.uid) {
            notifications.error('why u tryna revoke ur own admin bro.', 'not allowed', '6000');
            return;
        }
        
        // Remove user from admin list
        database.ref('adminUsers/' + userId).remove()
            .then(() => {
                // Update local state
                delete adminUsers[userId];
                
                // Update UI
                updateAdminUserSelect();
                loadContactsList();
                
                // Show success message
                notifications.success(`admin privileges revoked from '${allUsers[userId]?.displayName || 'Unknown User'}', bro.`, 'admin revoked', '4000');
            })
            .catch(error => {
                console.error("👮➡️👤 ❌ Error revoking admin:", error);
                notifications.error("couldn't revoke admin privileges, bro. try again.", 'Error', '6000');
            });
    }

    // ====================================================================================================
    // UI COLLAPSE/EXPAND FUNCTIONS
    // ====================================================================================================
    
    // Initialize collapsed sections from localStorage
    function initCollapsedSections() {
        const saved = localStorage.getItem('collapsedSections');
        if (saved) {
            collapsedSections = JSON.parse(saved);
        } else {
            // Default: collapse rooms and users on mobile, and always collapse admin
            if (window.innerWidth <= 480) {
                collapsedSections = {
                    'recent-chats-section': false,
                    'rooms-section': false,
                    'users-section': true,
                    'admin-section': true 
                };
            } else {
                collapsedSections = {
                    'recent-chats-section': false,
                    'rooms-section': false,
                    'users-section': false,
                    'admin-section': true
                };
            }
        }
    }

    function applyCollapsedStates() {
        Object.keys(collapsedSections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const content = document.getElementById(sectionId.replace('-section', '-content'));
            const toggle = section ? section.querySelector('.collapse-toggle') : null;
        
            if (section && content && toggle) {
                if (collapsedSections[sectionId]) {
                    content.classList.add('collapsed');
                    toggle.classList.add('collapsed');
                    toggle.textContent = '▶';
                } else {
                    content.classList.remove('collapsed');
                    toggle.classList.remove('collapsed');
                    toggle.textContent = '▼';
                }
            }
        });
    }

    // Toggle section collapse
    function toggleSection(sectionId) {
        collapsedSections[sectionId] = !collapsedSections[sectionId];
        localStorage.setItem('collapsedSections', JSON.stringify(collapsedSections));
        applyCollapsedStates();
    }

    // ====================================================================================================
    // AUTHENTICATION FUNCTIONS
    // ====================================================================================================
    
    // Auth tab switching
    function switchAuthTab(tab) {
        if (!guestTab || !accountTab || !guestPanel || !accountPanel || 
            !signupPanel || !usernamePanel) {
            console.error("🗂️ ❌ Missing auth tab elements");
            return;
        }
        
        if (tab === 'guest') {
            guestTab.classList.add('active');
            accountTab.classList.remove('active');
            guestPanel.classList.add('active');
            accountPanel.classList.remove('active');
            signupPanel.classList.remove('active');
            usernamePanel.classList.remove('active');
        } else {
            accountTab.classList.add('active');
            guestTab.classList.remove('active');
            accountPanel.classList.add('active');
            guestPanel.classList.remove('active');
            signupPanel.classList.remove('active');
            usernamePanel.classList.remove('active');
        }
    }

    function switchAuthPanel(panel) {
        if (!guestPanel || !accountPanel || !signupPanel || !usernamePanel) {
            console.error("🗂 ❌ Missing auth panel elements");
            return;
        }
        
        // Hide all panels first
        guestPanel.classList.remove('active');
        accountPanel.classList.remove('active');
        signupPanel.classList.remove('active');
        usernamePanel.classList.remove('active');
        
        // Show the requested panel
        if (panel === 'signup') {
            signupPanel.classList.add('active');
        } else if (panel === 'login') {
            accountPanel.classList.add('active');
        } else if (panel === 'username') {
            usernamePanel.classList.add('active');
        }
    }

    // Login as guest - Fixed race condition
    function loginAsGuest() {
        const username = guestUsername.value.trim();
        if (!username) {
            notifications.error('u gotta enter a username , bro.', 'action required', '6000');
            return;
        }
        
        // Loading animation START
        setButtonLoading(guestLoginBtn, true);
        
        // Check if username is taken first, then sign in
        const username_lower = username.toLowerCase();
        database.ref('users').orderByChild('displayName_lower').equalTo(username_lower).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    // Name is taken, show error and stop
                    notifications.error(`"${username}" is taken, bro. choose another.`, 'error', '6000');
                    setButtonLoading(guestLoginBtn, false);
                    return Promise.reject(new Error('Username taken'));
                }
                
                // Name is available, proceed with authentication
                return auth.signInAnonymously();
            })
            .then(userCredential => {
                currentUser = userCredential.user;
                console.log("👤🤨 ✅ Guest signed in successfully");
                
                // Save the guest's data to the database
                return database.ref('users/' + currentUser.uid).set({
                    displayName: username,
                    displayName_lower: username.toLowerCase(),
                    isGuest: true,
                    isAdmin: false, // Guests cannot be admins
                    lastSeen: firebase.database.ServerValue.TIMESTAMP,
                    uid: currentUser.uid
                });
            })
            .then(() => {
                // Update the user's profile and enter the app
                return currentUser.updateProfile({ displayName: username });
            })
            .then(() => {
                setupUser();
            })
            .catch(error => {
                console.error("couldn't sign u in as guest bro. error:", error);
                if (error.message !== 'Username taken') {
                    notifications.error(error.message);
                }
            })
            .finally(() => {
                // Re-enable the button regardless of outcome
                setButtonLoading(guestLoginBtn, false);
            });
    }

    // Login with email
    function loginWithEmail() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (email && password) {
            // Loading animation START
            setButtonLoading(loginBtn, true);

            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    currentUser = userCredential.user;
                    
                    // Reload user to get latest emailVerified status
                    return currentUser.reload();
                })
                .then(() => {
                    console.log("Email user signed in:", currentUser);
                    
                    // Check if user has a display name
                    if (!currentUser.displayName || currentUser.displayName === '') {
                        // Show username selection panel
                        switchAuthPanel('username');
                    } else {
                        // User already has a display name, proceed
                        setupUser();
                    }
                    
                    // Update verification status in UI
                    updateVerificationUI();
                })
                .catch(error => {
                    console.error("📧➡️ ❌ Error signing in:", error);
                    
                    // Custom error messages for common issues
                    let specificMessage = "";

                    if (error.code === 'auth/user-not-found') {
                        specificMessage = "ur account wasn't found.";
                    } else if (error.code === 'auth/invalid-login-credentials') {
                        specificMessage = "that might be the wrong email/password combination.";
                    } else if (error.code === 'auth/wrong-password') {
                        specificMessage = "that's the wrong password.";
                    } else if (error.code === 'auth/invalid-email') {
                        specificMessage = "that email isn't in the correct format.";
                    } else if (error.code === 'auth/user-disabled') {
                        specificMessage = "ur account's been disabled by a leader.";
                    } else if (error.code === 'auth/too-many-requests') {
                        specificMessage = "u tried logging in too many times. try again later.";
                    }

                    // Always show base message + specific if available
                    if (specificMessage) {
                        notifications.error("couldn't sign u in, mate." + " " + specificMessage);
                    } else {
                        notifications.error("couldn't sign u in, mate." + " " + error.message);
                    }

                    // Debug the actual error code
                    console.log("📧➡️ ❌ Error code:", error.code);
                })
                .finally(() => {
                    // Loading animation END
                    setButtonLoading(loginBtn, false);
                });
        } else {
            notifications.warning('u gotta enter an email and password, mate.');
        }
    }
    
    // Send verification email
    function sendEmailVerification() {
        if (!currentUser) {
            notifications.error('u gotta log in first, mate.');
            return;
        }
        
        if (currentUser.emailVerified) {
            notifications.error('ur email is already verified, bro.');
            return;
        }
        
        // Show loading state
        const verifyButton = document.getElementById('verify-email-btn');
        if (verifyButton) {
            verifyButton.disabled = true;
            verifyButton.textContent = 'sending...';
        }
        
        currentUser.sendEmailVerification()
            .then(() => {
                // Update tooltip message
                const tooltipStatus = document.getElementById('tooltip-status');
                if (tooltipStatus) {
                    tooltipStatus.textContent = 'email sent! check your inbox and spam folders.';
                    tooltipStatus.style.color = '#4caf50';
                    
                    // Reset after 5 seconds
                    setTimeout(() => {
                        tooltipStatus.textContent = 'email not verified';
                        tooltipStatus.style.color = '#f44336';
                    }, 5000);
                }
            })
            .catch(error => {
                console.error("📩✔️ ❌ Error sending verification email:", error);
                
                // Update tooltip message
                const tooltipStatus = document.getElementById('tooltip-status');
                if (tooltipStatus) {
                    tooltipStatus.textContent = `error: ${error.message}`;
                    tooltipStatus.style.color = '#f44336';
                    
                    // Reset after 5 seconds
                    setTimeout(() => {
                        tooltipStatus.textContent = 'email not verified';
                        tooltipStatus.style.color = '#f44336';
                    }, 5000);
                }
            })
            .finally(() => {
                // Restore button state
                if (verifyButton) {
                    verifyButton.disabled = false;
                    verifyButton.textContent = 'verify email';
                }
            });
    }

    // Update UI based on verification status
    function updateVerificationUI() {
        const container = document.getElementById('email-verification-icon');
        const icon = document.getElementById('verification-icon');
        const tooltipStatus = document.getElementById('tooltip-status');
        const tooltipEmail = document.getElementById('tooltip-email');
        const verifyBtn = document.getElementById('verify-email-btn');
        
        if (!container || !icon || !tooltipStatus) return;
        
        // Only show verification UI for non-anonymous users
        if (currentUser && !currentUser.isAnonymous) {
            container.style.display = 'block';
            
            if (currentUser.emailVerified) {
                // Verified state
                icon.className = 'verification-icon verified';
                icon.textContent = '✓';
                tooltipStatus.textContent = 'email verified';
                tooltipStatus.style.color = '#4caf50';
                if (verifyBtn) verifyBtn.style.display = 'none';
            } else {
                // Unverified state
                icon.className = 'verification-icon not-verified';
                icon.textContent = '✕';
                tooltipStatus.textContent = 'email not verified';
                tooltipStatus.style.color = '#f44336';
                if (verifyBtn) verifyBtn.style.display = 'block';
            }
            
            // Show email in tooltip
            if (currentUser.email && tooltipEmail) {
                tooltipEmail.textContent = currentUser.email;
            }
        } else {
            container.style.display = 'none';
        }
    }

    // Set username for new users
    function setUsername() {
        const username = chooseUsername.value.trim();
        
        if (username && currentUser) {
            // Loading animation START
            setButtonLoading(setUsernameBtn, true);

            // Update the user's profile with the chosen username
            currentUser.updateProfile({ displayName: username })
                .then(() => {
                    // Also save the lowercase name to the database
                    return database.ref('users/' + currentUser.uid).update({
                        displayName: username,
                        displayName_lower: username.toLowerCase(),
                        uid: currentUser.uid
                    });
                })
                .then(() => {
                    // Proceed to app
                    setupUser();
                })
                .catch(error => {
                    console.error("👤📛 ❌ Set username failed. Error:", error);
                    notifications.error("couldn't set that username for u, bro. check the console for details.", "that didn't work", '6000');
                })
                .finally(() => {
                    // Loading animation END
                    setButtonLoading(setUsernameBtn, false);
                });
        } else {
            notifications.warning('u gotta enter a username, mate.');
        }
    }

    // Sign up new user
    function signUp() {
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const name = displayName.value.trim();
        
        // Validate inputs
        if (!email || !password || !name) {
            notifications.error('Please fill all fields', 'Validation Error', 3000);
            return;
        }
        
        if (password.length < 6) {
            notifications.error('Password must be at least 6 characters', 'Validation Error', 3000);
            return;
        }
        
        if (email && password && name) {
            // Loading animation START
            setButtonLoading(signupBtn, true);

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // Update display name in Firebase Auth
                    return userCredential.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    currentUser = auth.currentUser;
                    
                    // Send verification email
                    return currentUser.sendEmailVerification();
                })
                .then(() => {
                    // Save user data to database
                    const displayName = currentUser.displayName || 'New User';
                    return database.ref('users/' + currentUser.uid).set({
                        displayName: displayName,
                        displayName_lower: displayName.toLowerCase(),
                        isGuest: false,
                        isAdmin: false,
                        emailVerified: false,
                        email: email,
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        lastSeen: firebase.database.ServerValue.TIMESTAMP,
                        uid: currentUser.uid
                    });
                })
                .then(() => {
                    // Show verification message
                    notifications.success('thanks for joining whisper, bro! make sure u verify ur email to send messages. u might have to check ur spam folder too.', 'thanks!', '10000');
                    
                    // Set up user
                    setupUser();
                })
                .catch(error => {
                    console.error("couldn't sign u up, mate. error:", error);
                    notifications.error(error.message);
                })
                .finally(() => {
                    // Loading animation END
                    setButtonLoading(signupBtn, false);
                });
        } else {
            notifications.warning('u gotta fill all fields, mate.');
        }
    }

    // Reset password
    function resetPassword() {
        const email = emailInput.value.trim();
        
        if (!email) {
            notifications.warning('u gotta enter your email address first, bro.');
            return;
        }

        // Show a loading state on the button
        const originalText = resetPasswordBtn.textContent;
        resetPasswordBtn.textContent = 'sending...';
        resetPasswordBtn.disabled = true;

        auth.sendPasswordResetEmail(email)
            .then(() => {
                notifications.success('password reset email sent, bro! check your email. try looking in your spam folder too.', 'done', '10000');
            })
            .catch(error => {
                console.error(" error:", error);
                notifications.error("couldn't send that password reset email, bro. check the console for details.", "that didn't work", '6000');
            })
            .finally(() => {
                // Restore the button
                resetPasswordBtn.textContent = originalText;
                resetPasswordBtn.disabled = false;
            });
    }

    function logout() {
        log("...⬅️🚗🚪 ℹ️ Logging out..", 0, 'auth');
        
        // End any active call
        if (isCallActive) {
            endCall();
        }
        
        // Detach all database listeners FIRST
        database.ref().off();
        
        // Clean up specific listeners
        if (currentMessagesRef) {
            currentMessagesRef.off();
            currentMessagesRef = null;
        }
        if (usersValueCallback) {
            database.ref('users').off('value', usersValueCallback);
            usersValueCallback = null;
        }
        
        // IMPORTANT: Clean up ban status listener
        if (currentUser) {
            database.ref('bannedUsers/' + currentUser.uid).off();
        }
        
        if (usersValueCallback) {
            database.ref('users').off('value', usersValueCallback);
            usersValueCallback = null;
        }
    
        log("✔️ All listeners have been detached.", 1, 'auth');

        // Sign out from Firebase
        if (currentUser) {
            auth.signOut().then(() => {
                log("✔️ Firebase sign-out successful.", 1, 'auth');
            }).catch(error => {
                console.error("⬅️🚗..🚪 ❌ Firebase sign-out failed:", error);
            });
        }
        currentUser = null;
        
        // Clear intervals
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
        
        if (window.verificationCheckInterval) {
            clearInterval(window.verificationCheckInterval);
            window.verificationCheckInterval = null;
        }
        
        // Clear local state
        currentRoom = 'general';
        privateChatUser = null;
        recentChats = [];
        // allUsers = {}; 
        // bannedUsers = {}; 
        // adminUsers = {}; 
        
        // Reset UI classes
        document.body.classList.remove('is-admin', 'is-logged-in');
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.classList.remove('user-logged-in');
        }
        
        // Hide admin panel
        if (adminPanel) adminPanel.style.display = 'none';
        
        // Force clear any remaining messages
        if (messages) messages.innerHTML = '';
        log("✔️ Messages cleared", 1, 'auth');
        
        if (window.currentUserBanStatusRef) {
            window.currentUserBanStatusRef.off();
            window.currentUserBanStatusRef = null;
        }
        
        // Show auth screen with proper z-index
        if (authContainer) {
            authContainer.style.display = 'flex';
            authContainer.style.position = 'relative';
            authContainer.style.zIndex = '1000';
            authContainer.style.backgroundColor = ''; // Ensure it's not transparent
        }
        
        // Hide app main completely
        if (appMain) {
            appMain.style.display = 'none';
            appMain.classList.remove('visible');
        }
        
        // Force DOM reflow to ensure changes take effect
        void document.body.offsetHeight;
        
        // Switch to login tab with slight delay
        setTimeout(() => {
            switchAuthTab('account');
            switchAuthPanel('login');
            
            // Ensure auth container is fully visible
            if (authContainer) {
                authContainer.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }, 50);
        
        log("🚗⬅️...🚪✅ Logout successful!", 0, 'auth');
    }

    // ====================================================================================================
    // USER SETUP AND DATA LOADING FUNCTIONS
    // ====================================================================================================
    
    // Setup user after authentication
    async function setupUser() {
        try {
            log("👤⚙️ ℹ️ Setting up user..", 0, 'user');
            
            // --- 1. SET DEFAULT STATE ---
            currentRoom = 'general';
            privateChatUser = null;
            
            log("✔️ Default states set", 1, 'user');
            
            // --- 2. UI & STATE SETUP ---
            document.body.classList.add('is-logged-in');
            document.querySelector('.app-container').classList.add('user-logged-in');

            const displayName = currentUser.displayName || 'User';
            userName.textContent = displayName;
            const avatarText = displayName && displayName.length > 0 ? displayName.charAt(0).toUpperCase() : 'U';
            userAvatar.textContent = avatarText;

            // Show the main app and the loading overlay
            if (authContainer) {
                authContainer.style.display = 'none';
            }
            if (appMain) {
                appMain.style.display = 'flex';
            }
            
            const loadingOverlay = document.getElementById('messages-loading-container');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
            
            log("✔️ UI/states set", 1, 'user');

            // --- 3. DATABASE & LISTENER SETUP ---
            const userRef = database.ref('users/' + currentUser.uid);
            
            // Update user data in database
            await userRef.update({
                displayName: displayName,
                displayName_lower: displayName.toLowerCase(),
                isGuest: currentUser.isAnonymous || false,
                lastSeen: firebase.database.ServerValue.TIMESTAMP
            });
            
            // Set up disconnect handler
            userRef.onDisconnect().update({
                isOnline: false,
                lastSeen: firebase.database.ServerValue.TIMESTAMP
            });
            
            log("✔️ Database and listeners loaded", 1, 'user');

            // --- 4. LOAD ROLE DATA ---
            try {
                log("ℹ️ Waiting to load role data...", 1, 'user');
                
                // Load all role data and wait for it to complete
                await loadRoleData();
                
                log("✔️ Role data loaded successfully", 2, 'user');
                log("✔️ Leader IDs:", window.leaderIds, 3, 'user');
                log("✔️ Admin users:", adminUsers, 3, 'user');
                log("✔️ Banned users:", bannedUsers, 3, 'user');
                
            } catch (error) {
                console.error("❌ Error loading role data:", error, 1, 'auth');
            }

            // --- 5. LOAD USERS DATA ---
            // Load all users first before proceeding
            await loadUsers();
            setupUsersListener();
            log("✔️ Users loaded.", 1, 'user');

            // --- 6. CHECK BAN STATUS ---
            try {
                log("ℹ️ Checking ban status for user:", currentUser.uid, 1, 'ban');
                const banSnapshot = await database.ref('bannedUsers/' + currentUser.uid).once('value');
                if (banSnapshot.exists()) {
                    const banData = banSnapshot.val();
                    log("ℹ️ 👤🚫 User is banned. Reason:", banData.reason, 2, 'ban');
                    showBannedNotification(banData.reason || 'No reason provided.');
                } else {
                    log("ℹ️ 👤✔️ User is not banned.", 2, 'ban');
                    hideBannedNotification();
                }
            } catch (banError) {
                console.error("❌ Error checking ban status:", banError);
                hideBannedNotification();
            }

            // --- 7. SET UP REAL-TIME LISTENERS ---
            
            log("ℹ️ Setting up listeners", 1, 'user');

            // Listen for changes to the current user's ban status
            const banStatusRef = database.ref('bannedUsers/' + currentUser.uid);
            banStatusRef.on('value', (snapshot) => {
                console.log("🔧 Ban status changed for user:", currentUser.uid);
                console.log("🔧 Ban data:", snapshot.val());
                
                if (snapshot.exists()) {
                    // User is banned
                    const banData = snapshot.val();
                    console.log("🚫 User is banned. Reason:", banData.reason);
                    showBannedNotification(banData.reason || 'No reason provided.');
                } else {
                    // User is not banned
                    console.log("✅ User is not banned.");
                    hideBannedNotification();
                }
            });

            // Store the reference so we can detach it later
            window.currentUserBanStatusRef = banStatusRef;

            // --- 8. SET UP PERIODIC UPDATES ---
            
            // Set up periodic heartbeat
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            heartbeatInterval = setInterval(() => {
                if (currentUser) {
                    userRef.update({ 
                        lastSeen: firebase.database.ServerValue.TIMESTAMP 
                    });
                }
            }, 30000);

            // Set up email verification check for non-guest users
            if (currentUser && !currentUser.isAnonymous) {
                window.verificationCheckInterval = setInterval(() => {
                    console.log("🔧 Checking email verification status...");
                    currentUser.reload().then(() => {
                        updateVerificationUI();
                    }).catch(error => {
                        console.error("Error reloading user for email check:", error);
                    });
                }, 30000); // 30 seconds
            }

            // --- 9. UPDATE UI BASED ON USER ROLE ---
            log("Updating UI based on user role...", 1, 'user');
            log("Is admin:", adminUsers[currentUser.uid], 2, 'user');
            log("Is leader:", isCurrentUserLeader(), 2, 'user');
            
            // Check if user is admin and update UI accordingly
            if (adminUsers[currentUser.uid]) {
                log("User is admin, showing admin panel", 2, 'user');
                document.body.classList.add('is-admin');
                if (adminPanel) {
                    adminPanel.style.display = 'block';
                    
                    // Manually collapse admin section by default
                    const adminContent = document.getElementById('admin-content');
                    const adminToggle = document.querySelector('#admin-section .collapse-toggle');
                    
                    if (adminContent && adminToggle) {
                        adminContent.classList.add('collapsed');
                        adminToggle.classList.add('collapsed');
                        adminToggle.textContent = '▶';
                    }
                }

            } else {
                log("User is not admin, hiding admin panel", 2, 'user');
                document.body.classList.remove('is-admin');
                if (adminPanel) {
                    adminPanel.style.display = 'none';
                }
            }
            
            // Check if user is leader
            if (isCurrentUserLeader()) {
                log("User is leader", 2, 'user');
                document.body.classList.add('is-leader');
                document.body.classList.add('is-admin'); // Leader is also an admin
                
                if (adminPanel) {
                    adminPanel.style.display = 'block';
                    
                    // Show all controls for leader
                    document.querySelectorAll('.leader-only').forEach(el => {
                        el.style.display = 'inline-block';
                    });
                    
                    document.querySelectorAll('.admin-only').forEach(el => {
                        el.style.display = 'inline-block';
                    });
                }
            }
            
            // Update roles
            updateUserRoleUI();
            
            // Check admins
            log("Building contacts list. adminUsers object is:", adminUsers, 1, 'user');
            loadContactsList();
            
            // Load rooms
            loadRooms();
            
            // Check if user is verified
            updateVerificationUI();
            
            // Load messages for the default room
            loadMessages();
            
            // Set up other real-time listeners
            setupTypingListeners();
            setupAdminListeners();
            setupCallListeners();
            
            // Load recent calls
            loadRecentCalls();
            
            // Clean up stale users after a delay
            setTimeout(cleanupStaleUsers, 5000);

            // Hide the loader and fade in the app
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            const appMainElement = document.getElementById('app-main');
            if (appMainElement) {
                appMainElement.classList.add('visible');
            }

        } catch (error) {
            console.error("❌ CRITICAL ERROR in setupUser:", error);
            notifications.error("a critical error occurred during login, bro. check the console for details.", 'CRITICAL ERROR', 10000);
            
            // Ensure UI is in a usable state even on error
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            const appMainElement = document.getElementById('app-main');
            if (appMainElement) appMainElement.classList.add('visible');
        }
        
        log("👤⚙️ User has been set up!", 0, 'user');
    }

    // Load initial app data
    async function loadInitialAppData() {
        try {
            console.log("🔧 loadInitialAppData: Starting to load initial data...");
            
            const initialLoadPromises = [
                loadRoomsInitial(),
                loadUsers(),
                loadRecentChatsInitial()
            ];

            await Promise.all(initialLoadPromises);
            
            console.log("✅ All initial data loaded. Hiding loader and fading in app.");
            
            // Hide the loader and fade in the app
            const loadingOverlay = document.getElementById('messages-loading-container');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            const appMainElement = document.getElementById('app-main');
            if (appMainElement) {
                appMainElement.classList.add('visible');
            }
            
        } catch (error) {
            console.error("❌ Error during initial data load:", error);
            notifications.error("couldn't load initial app data, bro. refresh the page and try again.", 'CRITICAL ERROR', '10000');
            
            // Still hide the loader so the user isn't stuck
            const loadingOverlay = document.getElementById('messages-loading-container');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            const appMainElement = document.getElementById('app-main');
            if (appMainElement) appMainElement.classList.add('visible');
        }
    }

    // Load initial rooms data
    function loadRoomsInitial() {
        return database.ref('rooms').once('value').then(snapshot => {
            const rooms = [];
            snapshot.forEach(childSnapshot => {
                const room = childSnapshot.val();
                rooms.push(room);
            });
            return rooms;
        });
    }

    // Load initial recent chats
    function loadRecentChatsInitial() {
        if (!currentUser) return Promise.resolve();
        
        return database.ref('recentChats/' + currentUser.uid).once('value').then(snapshot => {
            const recentChats = [];
            snapshot.forEach(childSnapshot => {
                recentChats.push(childSnapshot.key);
            });
            return recentChats;
        });
    }

    // Load initial users data
    function loadUsersInitial() {
        return database.ref('users').once('value').then(snapshot => {
            allUsers = {};
            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                const userId = childSnapshot.key;
                allUsers[userId] = user;
            });
            return allUsers;
        });
    }
    
    function setupUsersListener() {
        console.log("🔧 Setting up real-time users listener...");
        
        // Detach any old listener first to prevent duplicates
        if (usersValueCallback) {
            database.ref('users').off('value', usersValueCallback);
        }

        // Create the new listener
        usersValueCallback = (snapshot) => {
            console.log("🔧 Users data updated in real-time. Rebuilding contact list.");
            allUsers = snapshot.val() || {};
            loadContactsList(); // Rebuild the contacts list with the new data
            loadPeopleToCall(); // Rebuild people to call list
        };

        // Attach the listener to the 'users' node
        database.ref('users').on('value', usersValueCallback);
    }

    // ====================================================================================================
    // TAB MANAGEMENT
    // ====================================================================================================
    
    // Switch between chat and calls tabs
    function switchTab(tabName) {
        if (!tabName || (tabName !== 'chat' && tabName !== 'calls')) return;
        
        activeTab = tabName;
        
        // Update tab buttons
        appTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update tab content
        if (tabName === 'chat') {
            chatTab.style.display = 'flex';
            callsTab.style.display = 'none';
            chatArea.style.display = 'flex';
            callArea.style.display = 'none';
        } else if (tabName === 'calls') {
            chatTab.style.display = 'none';
            callsTab.style.display = 'flex';
            chatArea.style.display = 'none';
            callArea.style.display = 'flex';
            
            // Load people to call and recent calls when switching to calls tab
            loadPeopleToCall();
            loadRecentCalls();
        }
    }

    // ====================================================================================================
    // ROOM MANAGEMENT FUNCTIONS
    // ====================================================================================================
    
    // Load rooms
    function loadRooms() {
        database.ref('rooms').once('value', snapshot => {
            if (snapshot.exists()) {
                if (!roomList) return; // Added: Null check
                
                roomList.innerHTML = '';
                snapshot.forEach(childSnapshot => {
                    const room = childSnapshot.val();
                    const roomElement = document.createElement('div');
                    roomElement.classList.add('room-item');
                    roomElement.dataset.room = childSnapshot.key;
                    roomElement.textContent = room.name;
                    
                    if (childSnapshot.key === currentRoom) {
                        roomElement.classList.add('active');
                    }
                    
                    roomList.appendChild(roomElement);
                });
            }
        });
    }

    // Add new room
    function addRoomFromModal() {
        const roomName = newRoomNameModal.value.trim();
        if (!roomName) {
            if (newRoomErrorMessage) {
                newRoomErrorMessage.textContent = 'Please enter a room name.';
                newRoomErrorMessage.style.display = 'block';
            }
            return;
        }

        const roomId = roomName.toLowerCase().replace(/\s+/g, '-');
        database.ref('rooms/' + roomId).set({
            name: roomName
        }).then(() => {
            // Success: close modal and clear input
            if (newRoomModal) newRoomModal.style.display = 'none';
            if (newRoomNameModal) newRoomNameModal.value = '';
            if (newRoomErrorMessage) newRoomErrorMessage.style.display = 'none';
            loadRooms(); // Refresh the room list
        }).catch(error => {
            // Error: show error message
            console.error("Error adding room:", error);
            if (newRoomErrorMessage) {
                newRoomErrorMessage.textContent = 'Failed to create room. Please try again.';
                newRoomErrorMessage.style.display = 'block';
            }
        });
    }

    // Switch to a different room
    function switchRoom(roomId) {
        // Clear typing indicators
        clearAllTypingIndicators();
        
        // Detach any existing message listener
        if (currentMessagesRef) {
            currentMessagesRef.off();
            currentMessagesRef = null;
        }
        
        // Update state
        currentRoom = roomId;
        privateChatUser = null;
        
        loadContactsList();
        
        // Update UI
        document.querySelectorAll('.room-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.room === roomId) {
                item.classList.add('active');
            }
        });
        
        const roomElement = document.querySelector(`.room-item[data-room="${roomId}"]`);
        if (roomElement && currentRoomName) {
            currentRoomName.textContent = roomElement.textContent;
        }
        
        // Load messages for the new room
        loadMessages();
    }

    // ====================================================================================================
    // USER MANAGEMENT FUNCTIONS
    // ====================================================================================================
    
    // Load users
    function loadUsers() {
        console.log("👥📋 Loading users - Creating a new, clean slate.");
        return new Promise((resolve, reject) => {
            const usersRef = database.ref('users');
            
            usersRef.once('value').then(snapshot => {
                console.log("👥📋 Received snapshot from Firebase.");
                
                allUsers = {}; // Reset the object
                snapshot.forEach(childSnapshot => {
                    const user = childSnapshot.val();
                    const userId = childSnapshot.key;
                    allUsers[userId] = user; // Populate the object
                });
                
                console.log("👥📋 All users loaded. allUsers object now contains:", allUsers);
                console.table(allUsers);
                resolve();
            }).catch(error => {
                console.error("👥📋 Failed to load users:", error);
                resolve(); // Still resolve to not break the chain
            });
        });
    }
    
    // Load all users
    function loadAllUsers() {
        database.ref('users').once('value', snapshot => {
            allUsers = {};
            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                const userId = childSnapshot.key;
                allUsers[userId] = user;
            });
        });
    }
    
    // Load contacts list
    function loadContactsList() {
        console.log("👥📋 Loading contacts list. The allUsers object contains:", allUsers);

        if (!recentChatsList) return; // Safety check

        recentChatsList.innerHTML = '';

        const now = Date.now();
        const twoMinutesAgo = now - (2 * 60 * 1000);
        const usersToShow = [];

        // Combine recent chats and all users into one list
        const allContactIds = new Set([...recentChats, ...Object.keys(allUsers)]);

        allContactIds.forEach(userId => {
            if (userId === currentUser.uid) return; // Don't add yourself
            if (isUserBanned(userId)) return; // Skip banned users

            const user = allUsers[userId];
            if (!user) return;

            // Filter out old guests
            if (user.isGuest && (!user.lastSeen || user.lastSeen < twoMinutesAgo)) {
                return;
            }

            usersToShow.push({
                userId: userId,
                user: user,
                isOnline: user.lastSeen && user.lastSeen > twoMinutesAgo,
                isLeader: window.leaderIds && window.leaderIds[userId],
                isAdmin: adminUsers[userId]
            });
        });

        // Sorting logic: Leaders first, then online status, then alphabetically
        usersToShow.sort((a, b) => {
            // 1. Leaders always come first
            if (a.isLeader && !b.isLeader) {
                return -1; // a comes before b
            }
            if (!a.isLeader && b.isLeader) {
                return 1; // b comes before a
            }
            
            // 2. If both are leaders or both are not leaders, check online status
            if (a.isOnline && !b.isOnline) {
                return -1; // a comes before b
            }
            if (!a.isOnline && b.isOnline) {
                return 1; // b comes before a
            }
            
            // 3. If both have same leader/online status, sort alphabetically
            return a.user.displayName.localeCompare(b.user.displayName);
        });

        if (usersToShow.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.color = 'var(--text-secondary)';
            emptyMessage.style.fontSize = '12px';
            emptyMessage.style.padding = '10px';
            emptyMessage.textContent = 'No contacts found.';
            recentChatsList.appendChild(emptyMessage);
            return;
        }

        // Build the UI from the sorted array
        usersToShow.forEach(({ userId, user, isOnline, isLeader, isAdmin }) => {
            const chatItem = document.createElement('div');
            chatItem.classList.add('recent-chat-item');
            chatItem.dataset.userId = userId;
            
            // Add gradient classes based on status
            if (isOnline) {
                chatItem.classList.add('online');
            } else {
                chatItem.classList.add('offline');
            }
            
            // Add role-based gradient classes - prioritize leader over admin
            if (isLeader) {
                chatItem.classList.add('leader');
            } else if (isAdmin) {
                chatItem.classList.add('admin');
            }
            
            // Highlight the active chat
            if (privateChatUser && privateChatUser === userId) {
                chatItem.classList.add('active');
            }

            const chatInfo = document.createElement('div');
            chatInfo.classList.add('chat-info');

            const chatName = document.createElement('div');
            chatName.classList.add('chat-name');

            // Build display text
            let displayText = user.displayName || 'Unknown User';
            if (user.isGuest) {
                displayText += ' (Guest)';
            }

            // Add role indicators - prioritize leader over admin
            if (!displayText.includes('👑') && window.leaderIds && window.leaderIds[userId]) {
                displayText += ' 👑'; // Leaders get crown
            } else if (!displayText.includes('⚡') && adminUsers[userId]) {
                displayText += ' ⚡'; // Admins get lightning bolt
            }

            chatName.textContent = displayText;

            chatInfo.appendChild(chatName);
            chatItem.appendChild(chatInfo);

            // Add call button for online users
            if (isOnline) {
                const callBtnContainer = document.createElement('div');
                callBtnContainer.classList.add('call-button-container');
                
                const videoCallBtn = document.createElement('button');
                videoCallBtn.classList.add('sidebar-call-btn', 'video-call-btn');
                videoCallBtn.textContent = '📹';
                videoCallBtn.title = 'Start video call';
                videoCallBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    initiateCall(userId);
                });
                
                const voiceCallBtn = document.createElement('button');
                voiceCallBtn.classList.add('sidebar-call-btn', 'voice-call-btn');
                voiceCallBtn.textContent = '📞';
                voiceCallBtn.title = 'Start voice call';
                voiceCallBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    initiateCall(userId);
                });
                
                callBtnContainer.appendChild(videoCallBtn);
                callBtnContainer.appendChild(voiceCallBtn);
                
                chatInfo.appendChild(callBtnContainer);
            }

            chatItem.addEventListener('click', () => {
                startPrivateChat(userId);
                // Close mobile sidebar after selecting chat
                if (window.innerWidth <= 480 && sidebar) {
                    sidebar.classList.remove('open');
                }
            });

            recentChatsList.appendChild(chatItem);
        });
    }

    // Search for users
    function searchForUsers(searchTerm) {
        const chatSearchResults = document.getElementById('chat-search-results');
        if (!chatSearchResults) return;
        
        chatSearchResults.innerHTML = '';
        
        if (!searchTerm) {
            return;
        }
        
        const results = [];
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        // Search through all users
        Object.keys(allUsers).forEach(userId => {
            if (userId === currentUser.uid) return; // Skip yourself
            
            // Skip banned users
            if (isUserBanned(userId)) return;
            
            const user = allUsers[userId];
            if (!user) return;
            
            const displayName = (user.displayName || 'Unknown User').toLowerCase();
            
            if (displayName.includes(lowerSearchTerm)) {
                results.push({ userId, user });
            }
        });
        
        // Display search results
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.style.color = '#9e9e9e';
            noResults.style.fontSize = '12px';
            noResults.style.padding = '8px';
            noResults.textContent = 'No users found';
            chatSearchResults.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('chat-search-result-item');
                resultElement.dataset.userId = result.userId;
                
                const nameElement = document.createElement('div');
                nameElement.classList.add('chat-search-result-name');
                
                let displayText = result.user.displayName || 'Unknown User';
                if (result.user.isGuest) {
                    displayText += ' (Guest)';
                }
                if (window.leaderIds && window.leaderIds[result.userId]) {
                    displayText += ' 👑';
                }
                
                nameElement.textContent = displayText;
                
                const statusElement = document.createElement('div');
                statusElement.classList.add('chat-search-result-status');
                
                const now = Date.now();
                const fiveMinutesAgo = now - (5 * 60 * 1000);
                if (result.user.lastSeen && result.user.lastSeen > fiveMinutesAgo) {
                    statusElement.textContent = 'Online';
                } else {
                    statusElement.textContent = 'Offline';
                }
                
                resultElement.appendChild(nameElement);
                resultElement.appendChild(statusElement);
                
                resultElement.addEventListener('click', () => {
                    startPrivateChat(result.userId);
                    chatSearchResults.innerHTML = '';
                    const chatSearchInput = document.getElementById('search-user-input');
                    if (chatSearchInput) chatSearchInput.value = '';
                });
                
                chatSearchResults.appendChild(resultElement);
            });
        }
    }

    // Populate and show search modal
    function populateAndShowSearchModal() {
        console.log("🔍 Populating search modal from existing user list.");
        console.log("🔍 DEBUG: The allUsers object contains:", allUsers);
        if (!searchResults) return; // Added: Null check
        
        searchResults.innerHTML = '';

        const now = Date.now();
        const twoMinutesAgo = now - (2 * 60 * 1000);
        const usersToShow = [];

        Object.keys(allUsers).forEach(userId => {
            if (userId === currentUser.uid) return; // Skip yourself
            if (isUserBanned(userId)) return; // Skip banned users

            const user = allUsers[userId];
            if (!user) return;

            // Filter out old guests
            if (user.isGuest && (!user.lastSeen || user.lastSeen < twoMinutesAgo)) {
                return;
            }

            usersToShow.push({
                userId: userId,
                user: user,
                isOnline: user.lastSeen && user.lastSeen > twoMinutesAgo
            });
        });

        // Sort: Online users first (A-Z), then offline users (A-Z)
        usersToShow.sort((a, b) => {
            // Online users come before offline users
            if (a.isOnline && !b.isOnline) return -1;
            if (!a.isOnline && b.isOnline) return 1;
            
            // If both have same online status, sort alphabetically A-Z
            return a.user.displayName.localeCompare(b.user.displayName);
        });

        if (usersToShow.length === 0) {
            searchResults.innerHTML = '<div style="padding: 10px; color: #9e9e9e;">No users found. Try refreshing.</div>';
            if (newChatModal) newChatModal.style.display = 'block';
            return;
        }

        // Build the UI from the sorted array
        usersToShow.forEach(({ userId, user, isOnline }) => {
            const userElement = document.createElement('div');
            userElement.classList.add('search-result-item');
            userElement.dataset.userId = userId;
            
            const nameElement = document.createElement('div');
            nameElement.classList.add('search-result-name');
            
            let displayText = user.displayName || 'Unknown User';
            if (user.isGuest) {
                displayText += ' (Guest)';
            }
            if (window.leaderIds && window.leaderIds[userId]) {
                displayText += ' 👑';
            }
            
            nameElement.textContent = displayText;
            
            const statusElement = document.createElement('div');
            statusElement.classList.add('search-result-status');
            
            if (isOnline) {
                statusElement.textContent = 'Online';
            } else {
                statusElement.textContent = 'Offline';
            }
            
            userElement.appendChild(nameElement);
            userElement.appendChild(statusElement);
            
            userElement.addEventListener('click', () => {
                startPrivateChat(userId);
                if (newChatModal) newChatModal.style.display = 'none';
            });
            
            searchResults.appendChild(userElement);
        });

        if (newChatModal) newChatModal.style.display = 'block';
    }

    // Start private chat with a user
    function startPrivateChat(userId) {
        // Clear typing indicators
        clearAllTypingIndicators();
        
        // Check if user is banned
        if (isUserBanned(userId)) {
            notifications.error("this is a banned user, bro. u can't chat with them now.", 'user not available', '6000');
            return;
        }
        
        privateChatUser = userId;
        
        // Add to recent chats
        addToRecentChats(userId);
        
        database.ref('users/' + userId).once('value', snapshot => {
            if (snapshot.exists()) {
                const user = snapshot.val();
                if (currentRoomName) {
                    currentRoomName.textContent = `${user.displayName || 'Unknown User'}`;
                }
                
                // Update room selection
                document.querySelectorAll('.room-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Refresh the entire contacts list to show all users again
                loadContactsList();
                
                // Load private messages
                loadMessages();
                setupTypingListeners();
            }
        });
    }

    // Cleanup function for stale users
    function cleanupStaleUsers() {
        const now = Date.now();
        const fiveMinutesAgo = now - (5 * 60 * 1000); // 5 minutes ago
        
        database.ref('users').once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                const userId = childSnapshot.key;
                
                // If user hasn't been seen in the last 5 minutes and is marked as online, remove the online status
                if (user.lastSeen && user.lastSeen < fiveMinutesAgo && user.isOnline) {
                    console.log(`User ${userId} is stale but not online. No action needed.`);
                    return;
                }
                
                // If user is a guest and hasn't been seen in the last 2 minutes, remove them
                if (user.isGuest && (!user.lastSeen || user.lastSeen < twoMinutesAgo)) {
                    console.log(`Removing stale guest user: ${userId}`);
                    database.ref('users/' + userId).remove();
                }
            });
        });
    }

    // ====================================================================================================
    // RECENT CHATS FUNCTIONS
    // ====================================================================================================
    
    // Load recent chats
    function loadRecentChats() {
        if (!currentUser) return; // Safety check
        
        database.ref('recentChats/' + currentUser.uid).once('value', snapshot => {
            recentChats = [];
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    recentChats.push(childSnapshot.key);
                });
            }
            updateRecentChatsUI();
        });
    }

    // Add user to recent chats
    function addToRecentChats(userId) {
        if (!recentChats.includes(userId)) {
            recentChats.unshift(userId);
            // Keep only the last 10 recent chats
            if (recentChats.length > 10) {
                recentChats = recentChats.slice(0, 10);
            }
            
            // Update in database
            const updates = {};
            recentChats.forEach((id, index) => {
                updates[id] = index;
            });
            database.ref('recentChats/' + currentUser.uid).set(updates);
        }
    }

    // Update recent chats UI
    function updateRecentChatsUI() {
        if (!recentChatsList) return; // Added: Null check
        
        recentChatsList.innerHTML = '';
        
        if (recentChats.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.color = 'var(--text-secondary)';
            emptyMessage.style.fontSize = '12px';
            emptyMessage.style.padding = '10px';
            emptyMessage.textContent = 'No recent chats';
            recentChatsList.appendChild(emptyMessage);
            return;
        }
        
        recentChats.forEach(userId => {
            // Skip banned users
            if (isUserBanned(userId)) return;
            
            database.ref('users/' + userId).once('value', snapshot => {
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    
                    if (user.isGuest) {
                        const now = Date.now();
                        const twoMinutesAgo = now - (2 * 60 * 1000);
                        
                        // Skip this old guest
                        if (!user.lastSeen || user.lastSeen < twoMinutesAgo) {
                            return;
                        }
                    }
                
                    const chatItem = document.createElement('div');
                    chatItem.classList.add('recent-chat-item');
                    chatItem.dataset.userId = userId;
                    chatItem.dataset.guest = user.isGuest;
                    
                    if (privateChatUser && privateChatUser === userId) {
                        chatItem.classList.add('active');
                    }
                    
                    const chatInfo = document.createElement('div');
                    chatInfo.classList.add('chat-info');

                    const chatName = document.createElement('div');
                    chatName.classList.add('chat-name');

                    let displayText = user.displayName || 'Unknown User';
                    if (user.isGuest) {
                        displayText += ' (Guest)';
                    }
                    
                    chatName.textContent = displayText;

                    chatInfo.appendChild(chatName);
                    chatItem.appendChild(chatInfo);
                    
                    recentChatsList.appendChild(chatItem);
                }
            });
        });
    }

    // ====================================================================================================
    // ADMIN FUNCTIONS
    // ====================================================================================================
    
    // Set up admin-specific listeners
    function setupAdminListeners() {
        if (!isCurrentUserAdmin()) return;
        
        // Listen for changes to banned users
        database.ref('bannedUsers').on('value', snapshot => {
            bannedUsers = snapshot.val() || {};
            loadContactsList();
        });
        
        // Listen for changes to admin users
        database.ref('adminUsers').on('value', snapshot => {
            adminUsers = snapshot.val() || {};
            loadContactsList();
        });
    }
    
    // Refresh banned users list (for leaders/admins)
    async function refreshBannedUsers() {
        if (!isCurrentUserAdmin() && !isCurrentUserLeader()) {
            notifications.error("You don't have permission to refresh banned users", 'Access Denied', 5000);
            return;
        }
        
        try {
            console.log("🔧 Refreshing banned users list...");
            const bannedSnapshot = await database.ref('bannedUsers').once('value');
            bannedUsers = bannedSnapshot.val() || {};
            console.log("🔧 Refreshed banned users:", bannedUsers);
            
            // Update UI
            updateAdminUserSelect();
            loadContactsList();
            
            notifications.success("Banned users list refreshed", 'Success', 3000);
        } catch (error) {
            console.error("🔧 Error refreshing banned users:", error);
            
            if (error.code === 'PERMISSION_DENIED') {
                notifications.warning("Permission denied. Your Firebase security rules may need updating.", 'Security Rules Warning', 5000);
            } else {
                notifications.error("Failed to refresh banned users list", 'Error', 5000);
            }
        }
    }

    // ====================================================================================================
    // MESSAGE MANAGEMENT FUNCTIONS
    // ====================================================================================================
    
    // Message Listener Manager - Fixed to properly handle listeners
    const MessageListenerManager = {
        currentPath: null,
        currentRef: null,
        listeners: [], // Track all listeners

        detach: function() {
            console.log("💬🦻👨‍💼 Detaching listener for path:", this.currentPath);
            
            if (this.currentRef) {
                this.currentRef.off();
                this.currentRef = null;
            }
            this.currentPath = null;
            
            // Clear all listeners
            this.listeners = [];
        },
        
        // Add this reset method to clear everything
        reset: function() {
            console.log("💬🦻👨‍💼 Resetting all state");
            this.detach();
            this.currentPath = null;
            this.currentRef = null;
            this.listeners = [];
        },
        
        attach: function(path, onMessage) {
            // If we're already listening to this exact path, do nothing to prevent duplicates.
            if (this.currentPath === path && this.currentRef) {
                console.log("💬🦻👨‍💼 Already listening to", path, ". Skipping re-attach.");
                return;
            }

            // If we were listening to a different path, detach that listener first.
            if (this.currentPath) {
                this.detach();
            }

            this.currentPath = path;
            this.currentRef = database.ref(path);
            
            console.log("💬🦻👨‍💼 Attaching NEW listener to path:", path);
            
            // Create a callback that we can track
            const messageCallback = (snapshot) => {
                if (snapshot.exists()) {
                    onMessage(snapshot.val());
                }
            };
            
            // Store the callback for later removal
            this.listeners.push({
                ref: this.currentRef,
                callback: messageCallback
            });
            
            this.currentRef.on('child_added', messageCallback);
        }
    };

    // Display a message
    function displayMessage(message) {
        const senderId = message.userId || message.senderId;
        
        // Check if message object exists
        if (!message) {
            console.error("Invalid message object:", message);
            return;
        }
        
        // Only play sound if message is NOT from current user AND tab is inactive
        if (senderId !== currentUser.uid && !isTabActive()) {
            playNotificationSound();
        }
        
        // Check if sender is banned
        if (isUserBanned(senderId)) {
            console.log("Message from banned user, not displaying.");
            return;
        }

        const messagesContainer = document.getElementById('messages');
        if (!messagesContainer) {
            console.error("Could not find the messages container element!");
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.dataset.messageId = message.messageId || message.key || 'unknown';
        messageElement.dataset.timestamp = message.timestamp;
        
        // Check if message is from current user
        const isCurrentUser = senderId === currentUser.uid;
        if (isCurrentUser) {
            messageElement.classList.add('current-user');
        }
        
        // Add guest status if it exists
        if (message.isGuest) {
            messageElement.setAttribute('data-guest', 'true');
        }

        // Add role indicator - prioritize leader over admin
        if (window.leaderIds && window.leaderIds[senderId]) {
            messageElement.classList.add('leader-message');
        } else if (adminUsers[senderId]) {
            messageElement.classList.add('admin-message');
        }

        // Handle replies
        if (message.replyTo) {
            messageElement.classList.add('is-reply');
            
            const repliedToElement = document.createElement('div');
            repliedToElement.classList.add('replied-to-message');
            repliedToElement.innerHTML = `<strong>${message.replyTo.username || message.replyTo.senderName}:</strong> ${message.replyTo.text}`;
            messageElement.appendChild(repliedToElement);
        }
        
        // Create username element with role indicators
        const usernameElement = document.createElement('div');
        usernameElement.classList.add('username');

        let displayName = message.username || message.senderName || 'Unknown User';

        // Add role indicators - prioritize leader over admin
        if (!displayName.includes('👑') && window.leaderIds && window.leaderIds[senderId]) {
            displayName += ' 👑'; // Leaders get crown
        } else if (!displayName.includes('⚡') && adminUsers[senderId]) {
            displayName += ' ⚡'; // Admins get lightning bolt
        }

        usernameElement.textContent = displayName;
        messageElement.appendChild(usernameElement);
        
        // Create content element
        const contentElement = document.createElement('div');
        contentElement.classList.add('content');

        // Check message type and render accordingly
        if (message.type === 'voice') {
            const audioPlayer = document.createElement('audio');
            audioPlayer.src = message.content;
            audioPlayer.controls = true;
            audioPlayer.classList.add('voice-player');
            contentElement.appendChild(audioPlayer);
        } else {
            const textElement = document.createElement('div');
            textElement.classList.add('text');
            textElement.textContent = message.text || message.content;
            contentElement.appendChild(textElement);
        }
        
        messageElement.appendChild(contentElement);
        
        // Create timestamp element
        const timeElement = document.createElement('div');
        timeElement.classList.add('time');
        
        const date = new Date(message.timestamp);
        timeElement.textContent = `${formatTime(date)} • ${formatShortDate(date)}`;
        messageElement.appendChild(timeElement);
        
        // Add reply button for non-current users
        if (!isCurrentUser) {
            const replyButtonContainer = document.createElement('div');
            replyButtonContainer.classList.add('reply-button-container');
            
            const replyButton = document.createElement('button');
            replyButton.classList.add('reply-button');
            replyButton.textContent = 'Reply';
            
            // Add the click event listener to initiate the reply
            replyButton.addEventListener('click', () => {
                setReplyingTo({
                    id: senderId,
                    username: message.username || message.senderName,
                    text: message.text
                });
            });
            
            replyButtonContainer.appendChild(replyButton);
            messageElement.appendChild(replyButtonContainer);
        }
        
        // Add message to container
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send a message
    async function sendMessage() {
        console.log("💬⤴️ sendMessage function STARTED =====");
        
        // Prevent sending other messages while recording or uploading
        if (isRecording || isUploading) {
            notifications.warning("Please wait for the voice message to finish processing.", "Please Wait");
            return;
        }
        
        const messageText = messageInput.value.trim();
        console.log("💬⤴️ Message text:", messageText);
        console.log("💬⤴️ Current user:", currentUser);
        console.log("💬⤴️ Replying to message:", replyingTo);
        
        // Check if current user is banned
        const isBanned = await isCurrentUserBanned();
        if (isBanned) {
            console.error("💬⤴️❌ Cannot send message. User is banned.");
            notifications.error("u can't send messages, bro. ur banned.", "Can't do that", 6000);
            
            // Show banned notification
            try {
                const banSnapshot = await database.ref('bannedUsers/' + currentUser.uid).once('value');
                if (banSnapshot.exists()) {
                    const banData = banSnapshot.val();
                    showBannedNotification(banData.reason || 'No reason provided.');
                }
            } catch (error) {
                console.error("Error fetching ban details:", error);
                showBannedNotification('No reason provided.');
            }
            
            return;
        }
        
        // Check if current user has verified their email (if not a guest)
        if (!currentUser.isAnonymous && !currentUser.emailVerified) {
            notifications.error("ur email is unverified, bro. verify it first, then try sending a message.", "Can't do that", '6000');
            return;
        }
        
        if (!currentUser) {
            console.error("💬⤴️❌ ERROR: Cannot send message. User is not logged in.");
            notifications.error("u gotta be logged in to send messages, bro.", "Can't do that (yet)", 6000);
            return;
        }
        
        if (!messageText && !selectedImage) {
            console.warn("💬⤴️⚠️ No content to send");
            return;
        }
        
        console.log("💬⤴️✅ Checks passed. Attempting to send message...");
        const timestamp = Date.now();
        
        let messageRef;
        let messageData;
        
        // Standardize message data structure
        const baseMessageData = {
            senderId: currentUser.uid,
            receiverId: privateChatUser,
            senderName: currentUser.displayName || 'User',
            text: messageText,
            timestamp: timestamp,
            isGuest: currentUser.isAnonymous,
            replyTo: replyingTo ? {
                text: replyingTo.text,
                username: replyingTo.username || replyingTo.senderName,
                id: replyingTo.id
            } : null
        };
        
        // Determine message location and prepare data
        if (privateChatUser) {
            // Private message
            const chatId = [currentUser.uid, privateChatUser].sort().join('_');
            messageRef = database.ref('privateMessages/' + chatId);
            messageData = baseMessageData;
        } else {
            // Public room message
            messageRef = database.ref('messages/' + currentRoom);
            messageData = {...baseMessageData, userId: currentUser.uid, username: currentUser.displayName || 'User'};
        }
        
        console.log("🔧 Message data to be sent:", messageData);
        
        // Send the message to Firebase
        const messagePromise = messageRef.push(messageData);
        
        // Handle the response
        messagePromise
            .then(() => {
                console.log("✅ SUCCESS: Message was successfully sent to Firebase!");
                
                // Clear input and states
                if (messageInput) messageInput.value = '';
                cancelReply();
                stopTyping();
                
                // Update recent chats if private message
                if (privateChatUser) {
                    addToRecentChats(privateChatUser);
                }
            })
            .catch((error) => {
                console.error("❌ ERROR: Firebase rejected the message. Error details:", error);
                notifications.error("couldn't send that message, bro. check the console for details.", 'Something Went Wrong', '8000');
            });
    }

    // Load messages
    function loadMessages() {
        console.log("💬✔️ loadMessages has been called.");
        
        const messagesContainer = document.getElementById('messages');
        if (!messagesContainer) {
            console.error("💬❌ Could not find the messages container element!");
            return;
        }
        
        // Clear existing messages
        messagesContainer.innerHTML = '';
        
        // Show loading indicator
        const loadingContainer = document.getElementById('messages-loading-container');
        if (loadingContainer) {
            loadingContainer.style.display = 'flex';
        }
        
        // Determine the path based on whether it's a private chat or room
        let path;
        if (privateChatUser) {
            const chatId = [currentUser.uid, privateChatUser].sort().join('_');
            path = 'privateMessages/' + chatId;
        } else {
            path = 'messages/' + currentRoom;
        }
        
        console.log("💬🦻 Setting up listener for path:", path);
        
        // Force detach any existing listener before attaching new one
        MessageListenerManager.detach();
        
        // Use the MessageListenerManager to handle messages
        MessageListenerManager.attach(
            path,
            (message) => {
                // Hide loading indicator after first message loads
                if (loadingContainer) {
                    loadingContainer.style.display = 'none';
                }
                displayMessage(message);
            }
        );
    }
    
    // Set replying to message
    function setReplyingTo(message) {
        replyingTo = message;
        
        // Update the message input area to show the preview
        const messageInputContainer = document.getElementById('message-input-container');
        if (!messageInputContainer) return; // Add this line
        
        // Remove any existing reply preview
        const existingPreview = messageInputContainer.querySelector('.reply-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Create the new reply preview element
        const replyPreview = document.createElement('div');
        replyPreview.classList.add('reply-preview');
        
        const replyText = document.createElement('span');
        replyText.textContent = `Replying to ${message.username || message.senderName}: "${message.text}"`;
        
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-reply-btn');
        cancelButton.textContent = '✕';
        
        replyPreview.appendChild(replyText);
        replyPreview.appendChild(cancelButton);
        
        // Insert the preview before the input field
        const inputWithButton = messageInputContainer.querySelector('.input-with-button');
        if (inputWithButton) {
            messageInputContainer.insertBefore(replyPreview, inputWithButton);
        }
        
        // Focus the input field
        if (messageInput) messageInput.focus();
        
        // Add click handler to cancel the reply
        cancelButton.addEventListener('click', cancelReply);
    }

    // Cancel reply
    function cancelReply() {
        replyingTo = null;
        
        // Remove the reply preview
        const replyPreview = document.querySelector('.reply-preview');
        if (replyPreview) {
            replyPreview.remove();
        }
        
        // Focus the input field
        if (messageInput) messageInput.focus();
    }

    // ====================================================================================================
    // CALLING FUNCTIONALITY
    // ====================================================================================================

    // --- WebRTC Configuration ---
    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    // --- Main Calling Functions ---

    // Initialize a call (outgoing)
    async function initiateCall(userId) {
        if (!currentUser || !userId || userId === currentUser.uid) {
            notifications.error("Invalid user for call.", "Error");
            return;
        }

        const user = allUsers[userId];
        if (!user) {
            notifications.error("User not found.", "Error");
            return;
        }

        // Check if user is online
        const now = Date.now();
        const twoMinutesAgo = now - (2 * 60 * 1000);
        if (!user.lastSeen || user.lastSeen < twoMinutesAgo) {
            notifications.warning(`${user.displayName} is offline.`, "Cannot Call");
            return;
        }

        // Check if we're already in a call
        if (isCallActive) {
            notifications.warning("You're already in a call.", "Cannot Call");
            return;
        }

        try {
            // Set up local media
            localStream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            
            if (localVideo) {
                localVideo.srcObject = localStream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
            notifications.error("Could not access camera or microphone.", "Media Error");
            return;
        }

        // Create peer connection
        createPeerConnection();

        // Add local stream to peer connection
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Create offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Create call record in Firebase
        const callData = {
            caller: currentUser.uid,
            callerName: currentUser.displayName,
            receiver: userId,
            offer: offer,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            status: 'calling'
        };

        const callRef = await database.ref('calls').push(callData);
        currentCall = {
            ref: callRef,
            id: callRef.key,
            userId: userId,
            isOutgoing: true
        };
        isCallActive = true;

        // Switch to calls tab
        switchTab('calls');

        // Update UI
        showActiveCallUI(user.displayName);

        // Add to active calls list
        addActiveCall({
            id: callRef.key,
            userId: userId,
            userName: user.displayName,
            status: 'calling',
            isOutgoing: true
        });

        // Listen for call status changes
        callRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data || data.status === 'ended') {
                endCall();
            } else if (data.status === 'connected') {
                // Call was accepted
                if (callStatus) {
                    callStatus.textContent = 'Connected';
                }
                
                // Update active call status
                updateActiveCallStatus(callRef.key, 'connected');
                
                // Start call timer
                startCallTimer();
            }
        });

        // Add to recent calls
        addToRecentCalls({
            userId: userId,
            userName: user.displayName,
            timestamp: Date.now(),
            duration: 0,
            status: 'outgoing'
        });
    }

    // Handle an incoming call
    async function handleIncomingCall(callId, callData) {
        // Check if we're already in a call
        if (isCallActive) {
            // Auto-reject if busy
            database.ref(`calls/${callId}`).update({
                status: 'busy'
            });
            return;
        }

        incomingCallData = { id: callId, ...callData };

        const callerUser = allUsers[callData.caller];
        if (!callerUser) return;

        // Play ringtone
        playRingtone();

        // Show incoming call UI
        showIncomingCallUI(callerUser.displayName);

        // Auto-reject after 30 seconds if not answered
        setTimeout(() => {
            if (incomingCallData && incomingCallData.id === callId) {
                rejectCall();
            }
        }, 30000);
    }

    // Accept an incoming call
    async function acceptCall() {
        if (!incomingCallData) return;

        const { id, offer, caller } = incomingCallData;

        // Stop ringtone
        stopRingtone();

        try {
            // Set up local media
            localStream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            
            if (localVideo) {
                localVideo.srcObject = localStream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
            notifications.error("Could not access camera or microphone.", "Media Error");
            rejectCall();
            return;
        }

        // Create peer connection
        createPeerConnection();

        // Add local stream to peer connection
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Set remote description from offer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        // Create answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Update call in Firebase with answer
        await database.ref(`calls/${id}`).update({
            answer: answer,
            status: 'connected'
        });

        isCallActive = true;
        currentCall = {
            ref: database.ref(`calls/${id}`),
            id: id,
            userId: caller,
            isOutgoing: false
        };

        // Hide the incoming call modal before switching tabs
        hideIncomingCallUI();

        // Switch to calls tab
        switchTab('calls');

        // Show active call UI
        const callingUser = allUsers[incomingCallData.caller];
        showActiveCallUI(callingUser.displayName);

        // Add to active calls list
        addActiveCall({
            id: id,
            userId: caller,
            userName: callingUser.displayName,
            status: 'connected',
            isOutgoing: false
        });

        // Listen for call end
        database.ref(`calls/${id}`).on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data || data.status === 'ended') {
                endCall();
            }
        });

        // Start call timer
        startCallTimer();

        // Add to recent calls
        addToRecentCalls({
            userId: caller,
            userName: callingUser.displayName,
            timestamp: Date.now(),
            duration: 0,
            status: 'incoming'
        });

        incomingCallData = null;
    }

    // Reject an incoming call
    async function rejectCall() {
        if (!incomingCallData) return;

        const { id } = incomingCallData;

        // Stop ringtone
        stopRingtone();

        // Update call status in Firebase
        await database.ref(`calls/${id}`).update({
            status: 'rejected'
        });

        // Hide call UI
        hideIncomingCallUI();

        incomingCallData = null;
    }

    // End an active call
    async function endCall() {
        if (currentCall) {
            // Update call status in Firebase
            await currentCall.ref.update({
                status: 'ended',
                endTime: firebase.database.ServerValue.TIMESTAMP
            });
            
            // Calculate call duration
            const endTime = Date.now();
            const duration = callStartTime ? Math.floor((endTime - callStartTime) / 1000) : 0;
            
            // Update recent calls with duration
            updateRecentCallDuration(currentCall.id, duration);
            
            currentCall = null;
        }

        // Stop local stream
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
        }

        // Stop remote stream
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => track.stop());
            remoteStream = null;
        }

        // Stop screen share stream if active
        if (isScreenSharing && screenShareStream) {
            screenShareStream.getTracks().forEach(track => track.stop());
            screenShareStream = null;
            isScreenSharing = false;
            
            if (screenShareVideo) {
                screenShareVideo.style.display = 'none';
                screenShareVideo.srcObject = null;
            }
            
            // Update screen share button
            if (toggleScreenShareBtn) {
                toggleScreenShareBtn.classList.remove('screen-sharing');
                toggleScreenShareBtn.textContent = '🖥️';
            }
        }

        // Close peer connection
        if (peerConnection) {
            peerConnection.close();
            peerConnection = null;
        }

        // Clear call timer
        if (callTimerInterval) {
            clearInterval(callTimerInterval);
            callTimerInterval = null;
        }

        // Hide call UI
        hideCallUI();

        // Remove from active calls list
        if (currentCall) {
            removeActiveCall(currentCall.id);
        }

        isCallActive = false;
        callStartTime = null;
    }

    // Toggle screen sharing
    async function toggleScreenShare() {
        if (!isCallActive) {
            notifications.warning("You need to be in a call to share your screen.", "Cannot Share");
            return;
        }

        if (isScreenSharing) {
            // Stop screen sharing
            if (screenShareStream) {
                screenShareStream.getTracks().forEach(track => track.stop());
                screenShareStream = null;
            }
            
            isScreenSharing = false;
            
            if (screenShareVideo) {
                screenShareVideo.style.display = 'none';
                screenShareVideo.srcObject = null;
            }
            
            // Update screen share button
            if (toggleScreenShareBtn) {
                toggleScreenShareBtn.classList.remove('screen-sharing');
                toggleScreenShareBtn.textContent = '🖥️';
            }
            
            // Remove screen share track from peer connection
            if (peerConnection) {
                const sender = peerConnection.getSenders().find(s => 
                    s.track && s.track.kind === 'video' && s.track.label.includes('screen')
                );
                if (sender) {
                    peerConnection.removeTrack(sender);
                }
                
                // Add back camera video track if available
                if (localStream) {
                    const videoTrack = localStream.getVideoTracks()[0];
                    if (videoTrack) {
                        peerConnection.addTrack(videoTrack, localStream);
                    }
                }
            }
        } else {
            try {
                // Start screen sharing
                screenShareStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false
                });
                
                isScreenSharing = true;
                
                if (screenShareVideo) {
                    screenShareVideo.srcObject = screenShareStream;
                    screenShareVideo.style.display = 'block';
                }
                
                // Update screen share button
                if (toggleScreenShareBtn) {
                    toggleScreenShareBtn.classList.add('screen-sharing');
                    toggleScreenShareBtn.textContent = '⏹️';
                }
                
                // Replace camera video with screen share in peer connection
                if (peerConnection) {
                    const sender = peerConnection.getSenders().find(s => 
                        s.track && s.track.kind === 'video' && !s.track.label.includes('screen')
                    );
                    if (sender) {
                        peerConnection.removeTrack(sender);
                    }
                    
                    // Add screen share track
                    const screenTrack = screenShareStream.getVideoTracks()[0];
                    if (screenTrack) {
                        peerConnection.addTrack(screenTrack, screenShareStream);
                    }
                }
                
                // Handle screen share end
                screenShareStream.getVideoTracks()[0].addEventListener('ended', () => {
                    toggleScreenShare();
                });
                
            } catch (error) {
                console.error("Error starting screen share:", error);
                notifications.error("Could not share your screen.", "Screen Share Error");
            }
        }
    }

    // --- WebRTC Helper Functions ---

    function createPeerConnection() {
        peerConnection = new RTCPeerConnection(configuration);

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate && currentCall) {
                currentCall.ref.child('iceCandidates').push(event.candidate);
            }
        };

        // Handle remote stream
        peerConnection.ontrack = (event) => {
            remoteStream = event.streams[0];
            if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
            }
        };
    }

    // --- Call UI Functions ---

    function showIncomingCallUI(callerName) {
        if (!incomingCallModal) return;

        if (incomingCallUserName) {
            incomingCallUserName.textContent = callerName || 'Unknown User';
        }
        
        if (incomingCallAvatar) {
            incomingCallAvatar.textContent = callerName ? callerName.charAt(0).toUpperCase() : '?';
        }

        incomingCallModal.style.display = 'block';
    }

    function hideIncomingCallUI() {
        if (incomingCallModal) {
            incomingCallModal.style.display = 'none';
        }
    }

    function showActiveCallUI(callerName) {
        if (callUserName) {
            callUserName.textContent = callerName || 'Unknown User';
        }
        
        if (callStatus) {
            callStatus.textContent = 'Connecting...';
        }
        
        callStartTime = Date.now();
        startCallTimer();
    }

    function hideCallUI() {
        // This is handled by tab switching
    }

    function startCallTimer() {
        if (!callTimer) return;

        callTimerInterval = setInterval(() => {
            const now = Date.now();
            const duration = Math.floor((now - callStartTime) / 1000);
            const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
            const seconds = (duration % 60).toString().padStart(2, '0');
            if (callTimer) {
                callTimer.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }

    // --- Call Control Functions ---

    function toggleMic() {
        if (!localStream) return;

        const audioTrack = localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            const micBtn = document.getElementById('toggle-mic-btn');
            if (micBtn) {
                micBtn.className = audioTrack.enabled ? 'call-btn mic-active' : 'call-btn mic-muted';
                micBtn.textContent = audioTrack.enabled ? '🎤' : '🔇';
            }
        }
    }

    function toggleVideo() {
        if (!localStream) return;

        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            const videoBtn = document.getElementById('toggle-video-btn');
            if (videoBtn) {
                videoBtn.className = videoTrack.enabled ? 'call-btn video-active' : 'call-btn video-disabled';
                videoBtn.textContent = videoTrack.enabled ? '📹' : '📵';
            }
        }
    }

    // --- Firebase Listeners for Call Signaling ---

    function setupCallListeners() {
        if (!currentUser) return;
        
        // Listen for incoming calls
        database.ref('calls').orderByChild('receiver').equalTo(currentUser.uid).on('child_added', (snapshot) => {
            const callData = snapshot.val();
            if (callData.status === 'calling') {
                handleIncomingCall(snapshot.key, callData);
            }
        });

        // Child changed listener for call updates
        database.ref('calls').on('child_changed', (snapshot) => {
            const callData = snapshot.val();
            
            // Handle answer to our outgoing call
            if (isCallActive && currentCall && currentCall.id === snapshot.key && callData.answer) {
                peerConnection.setRemoteDescription(new RTCSessionDescription(callData.answer));
                
                // Update status
                if (callStatus) {
                    callStatus.textContent = 'Connected';
                }
                
                // Update active call status
                updateActiveCallStatus(snapshot.key, 'connected');
                
                // Start call timer
                startCallTimer();
            }
            
            // Handle ICE candidates
            if (isCallActive && currentCall && currentCall.id === snapshot.key && callData.iceCandidates) {
                Object.values(callData.iceCandidates).forEach(candidate => {
                    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                });
            }
        });

        // Listen for user status changes
        database.ref('users').on('value', (snapshot) => {
            allUsers = snapshot.val() || {};
            
            // If we're on the calls tab, refresh the people list
            if (activeTab === 'calls') {
                loadPeopleToCall();
            }
            
            // Also refresh contacts list in chat tab
            if (activeTab === 'chat') {
                loadContactsList();
            }
        });
    }

    // --- Active Calls Management ---

    function addActiveCall(call) {
        if (!activeCallsList) return;
        
        // Hide "no calls" message
        if (noCallsMessage) {
            noCallsMessage.style.display = 'none';
        }
        
        const callItem = document.createElement('div');
        callItem.classList.add('call-item');
        callItem.dataset.callId = call.id;
        
        const avatar = document.createElement('div');
        avatar.classList.add('call-item-avatar');
        avatar.textContent = call.userName ? call.userName.charAt(0).toUpperCase() : '?';
        
        const info = document.createElement('div');
        info.classList.add('call-item-info');
        
        const name = document.createElement('div');
        name.classList.add('call-item-name');
        name.textContent = call.userName || 'Unknown User';
        
        const status = document.createElement('div');
        status.classList.add('call-item-status');
        status.textContent = call.status === 'connected' ? 'In call' : 'Calling...';
        if (call.status === 'connected') {
            status.classList.add('active');
        }
        
        info.appendChild(name);
        info.appendChild(status);
        
        const controls = document.createElement('div');
        controls.classList.add('call-item-controls');
        
        const endBtn = document.createElement('button');
        endBtn.classList.add('call-item-btn', 'end-call');
        endBtn.textContent = '📞';
        endBtn.addEventListener('click', () => {
            if (currentCall && currentCall.id === call.id) {
                endCall();
            }
        });
        
        controls.appendChild(endBtn);
        
        callItem.appendChild(avatar);
        callItem.appendChild(info);
        callItem.appendChild(controls);
        
        activeCallsList.appendChild(callItem);
    }

    function removeActiveCall(callId) {
        const callItem = document.querySelector(`.call-item[data-call-id="${callId}"]`);
        if (callItem) {
            callItem.remove();
        }
        
        // Show "no calls" message if needed
        if (activeCallsList && activeCallsList.children.length === 0) {
            if (noCallsMessage) {
                noCallsMessage.style.display = 'block';
            }
        }
    }

    function updateActiveCallStatus(callId, status) {
        const callItem = document.querySelector(`.call-item[data-call-id="${callId}"]`);
        if (callItem) {
            const statusElement = callItem.querySelector('.call-item-status');
            if (statusElement) {
                statusElement.textContent = status === 'connected' ? 'In call' : 'Calling...';
                statusElement.className = 'call-item-status';
                if (status === 'connected') {
                    statusElement.classList.add('active');
                }
            }
        }
    }

    // --- Recent Calls Management ---

    function loadRecentCalls() {
        if (!currentUser || !recentCallsList) return;
        
        database.ref('recentCalls/' + currentUser.uid).once('value', snapshot => {
            recentCalls = [];
            
            if (snapshot.exists()) {
                const callsData = snapshot.val();
                
                // Convert to array and sort by timestamp (newest first)
                const callsArray = Object.keys(callsData).map(callId => ({
                    id: callId,
                    ...callsData[callId]
                })).sort((a, b) => b.timestamp - a.timestamp);
                
                recentCalls = callsArray;
            }
            
            updateRecentCallsUI();
        });
    }

    function addToRecentCalls(call) {
        if (!currentUser) return;
        
        const callId = database.ref('recentCalls/' + currentUser.uid).push().key;
        
        database.ref('recentCalls/' + currentUser.uid + '/' + callId).set(call)
            .then(() => {
                // Refresh recent calls
                loadRecentCalls();
            })
            .catch(error => {
                console.error("Error adding to recent calls:", error);
            });
    }

    function updateRecentCallDuration(callId, duration) {
        database.ref('recentCalls/' + currentUser.uid + '/' + callId).update({
            duration: duration
        }).catch(error => {
            console.error("Error updating call duration:", error);
        });
    }

    function updateRecentCallsUI() {
        if (!recentCallsList) return;
        
        recentCallsList.innerHTML = '';
        
        if (recentCalls.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.color = 'var(--text-secondary)';
            emptyMessage.style.fontSize = '12px';
            emptyMessage.style.padding = '10px';
            emptyMessage.textContent = 'No recent calls';
            recentCallsList.appendChild(emptyMessage);
            return;
        }
        
        recentCalls.forEach(call => {
            const callItem = document.createElement('div');
            callItem.classList.add('call-item');
            
            const avatar = document.createElement('div');
            avatar.classList.add('call-item-avatar');
            avatar.textContent = call.userName ? call.userName.charAt(0).toUpperCase() : '?';
            
            const info = document.createElement('div');
            info.classList.add('call-item-info');
            
            const name = document.createElement('div');
            name.classList.add('call-item-name');
            name.textContent = call.userName || 'Unknown User';
            
            const status = document.createElement('div');
            status.classList.add('call-item-status');
            
            // Determine status text and class
            let statusText = 'Unknown';
            let statusClass = '';
            
            if (call.status === 'missed') {
                statusText = 'Missed';
                statusClass = 'missed';
            } else if (call.status === 'incoming') {
                statusText = 'Incoming';
                statusClass = '';
            } else if (call.status === 'outgoing') {
                statusText = 'Outgoing';
                statusClass = '';
            } else if (call.status === 'connected') {
                statusText = 'Connected';
                statusClass = 'active';
            }
            
            status.textContent = statusText;
            status.className = `call-item-status ${statusClass}`;
            
            // Format duration if available
            const durationText = call.duration ? formatDuration(call.duration) : '';
            
            const timeElement = document.createElement('div');
            timeElement.classList.add('call-item-time');
            timeElement.textContent = `${formatTime(new Date(call.timestamp))}${durationText ? ` • ${durationText}` : ''}`;
            
            info.appendChild(name);
            info.appendChild(status);
            info.appendChild(timeElement);
            
            const controls = document.createElement('div');
            controls.classList.add('call-item-controls');
            
            const callBtn = document.createElement('button');
            callBtn.classList.add('call-item-btn');
            callBtn.textContent = '📞';
            callBtn.addEventListener('click', () => {
                initiateCall(call.userId);
            });
            
            controls.appendChild(callBtn);
            
            callItem.appendChild(avatar);
            callItem.appendChild(info);
            callItem.appendChild(controls);
            callItem.appendChild(timeElement);
            
            recentCallsList.appendChild(callItem);
        });
    }

    // Format duration helper
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // --- People to Call ---

    function loadPeopleToCall() {
        if (!currentUser || !peopleToCallList) return;
        
        peopleToCallList.innerHTML = '';
        
        const now = Date.now();
        const twoMinutesAgo = now - (2 * 60 * 1000);
        const onlineUsers = [];
        
        // Get all online users (not banned, not yourself)
        Object.keys(allUsers).forEach(userId => {
            if (userId === currentUser.uid) return; // Skip yourself
            if (isUserBanned(userId)) return; // Skip banned users
            
            const user = allUsers[userId];
            if (!user) return;
            
            // Filter out old guests
            if (user.isGuest && (!user.lastSeen || user.lastSeen < twoMinutesAgo)) {
                return;
            }
            
            // Check if user is online
            const isOnline = user.lastSeen && user.lastSeen > twoMinutesAgo;
            
            if (isOnline) {
                onlineUsers.push({
                    userId: userId,
                    user: user,
                    isLeader: window.leaderIds && window.leaderIds[userId],
                    isAdmin: adminUsers[userId]
                });
            }
        });
        
        // Sort users: Leaders first, then admins, then alphabetically
        onlineUsers.sort((a, b) => {
            // 1. Leaders always come first
            if (a.isLeader && !b.isLeader) {
                return -1; // a comes before b
            }
            if (!a.isLeader && b.isLeader) {
                return 1; // b comes before a
            }
            
            // 2. If both are leaders or both are not leaders, check online status
            if (a.isOnline && !b.isOnline) {
                return -1; // a comes before b
            }
            if (!a.isOnline && b.isOnline) {
                return 1; // b comes before a
            }
            
            // 3. If both have same leader/online status, sort alphabetically
            return a.user.displayName.localeCompare(b.user.displayName);
        });

        if (onlineUsers.length === 0) {
            if (noPeopleMessage) {
                noPeopleMessage.style.display = 'block';
            }
            if (peopleToCallList) {
                peopleToCallList.style.display = 'none';
            }
        } else {
            if (noPeopleMessage) {
                noPeopleMessage.style.display = 'none';
            }
            if (peopleToCallList) {
                peopleToCallList.style.display = 'flex';
            }
        }

        // Build the UI from the sorted array
        onlineUsers.forEach(({ userId, user, isLeader, isAdmin }) => {
            const personItem = document.createElement('div');
            personItem.classList.add('person-to-call-item');
            
            // Add online class
            personItem.classList.add('online');
            
            // Add role-based gradient classes - prioritize leader over admin
            if (isLeader) {
                personItem.classList.add('leader');
            } else if (isAdmin) {
                personItem.classList.add('admin');
            }
            
            const avatar = document.createElement('div');
            avatar.classList.add('person-to-call-avatar');
            avatar.textContent = user.displayName ? user.displayName.charAt(0).toUpperCase() : '?';
            
            const info = document.createElement('div');
            info.classList.add('person-to-call-info');
            
            const name = document.createElement('div');
            name.classList.add('person-to-call-name');
            
            let displayText = user.displayName || 'Unknown User';
            if (user.isGuest) {
                displayText += ' (Guest)';
            }
            
            // Add role indicators
            if (isLeader) {
                displayText += ' 👑';
            } else if (isAdmin) {
                displayText += ' ⚡';
            }
            
            name.textContent = displayText;
            
            const status = document.createElement('div');
            status.classList.add('person-to-call-status');
            status.textContent = 'Online';
            
            const controls = document.createElement('div');
            controls.classList.add('person-to-call-controls');
            
            // Video call button
            const videoCallBtn = document.createElement('button');
            videoCallBtn.classList.add('person-to-call-btn', 'video-btn');
            videoCallBtn.textContent = '📹';
            videoCallBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                initiateCall(userId);
            });
            
            // Voice call button
            const voiceCallBtn = document.createElement('button');
            voiceCallBtn.classList.add('person-to-call-btn', 'call-btn');
            voiceCallBtn.textContent = '📞';
            voiceCallBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                initiateCall(userId);
            });
            
            controls.appendChild(videoCallBtn);
            controls.appendChild(voiceCallBtn);
            
            info.appendChild(name);
            info.appendChild(status);
            
            personItem.appendChild(avatar);
            personItem.appendChild(info);
            personItem.appendChild(controls);
            
            peopleToCallList.appendChild(personItem);
        });
    }

    // ====================================================================================================
    // IMAGE UPLOAD FUNCTIONS
    // ====================================================================================================
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Show image preview
    function showImagePreview(file) {
        if (!previewContainer || !preview || !imageName || !imageSize) return; // Added: Null check
        
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            imageName.textContent = file.name;
            imageSize.textContent = formatFileSize(file.size);
            previewContainer.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }

    // Cancel image upload
    function cancelImageUpload() {
        selectedImage = null;
        if (previewContainer) previewContainer.style.display = 'none';
        if (imageInput) imageInput.value = '';
    }

    // Upload image to Firebase Storage and return URL
    async function uploadImageAndGetUrl(file) {
        return new Promise((resolve, reject) => {
            try {
                // Validate file
                if (!file.type.startsWith('image/')) {
                    reject(new Error('Invalid file type. Please select an image.'));
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    reject(new Error('Image size must be less than 5MB'));
                    return;
                }
                
                // Create unique filename
                const timestamp = Date.now();
                const fileName = `images/${currentUser.uid}/${timestamp}_${file.name}`;
                
                // Upload to Firebase Storage
                const storageRef = storage.ref(fileName);
                const uploadTask = storageRef.put(file);
                
                // Show progress
                showUploadProgress();
                
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    updateUploadProgress(progress);
                });
                
                uploadTask.then((snapshot) => {
                    hideUploadProgress();
                    return snapshot.ref.getDownloadURL();
                })
                .then((downloadURL) => {
                    console.log("🔗 Got download URL:", downloadURL);
                    resolve(downloadURL);
                })
                .catch((error) => {
                    console.error("❌ Storage error:", error);
                    reject(error);
                });
            } catch (error) {
                console.error("❌ Upload error:", error);
                reject(error);
            }
        });
    }

    // Update upload progress bar
    function updateUploadProgress(percentage) {
        const progressBar = document.querySelector('.upload-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
        }
    }

    // Show upload progress
    function showUploadProgress() {
        const messageInputContainer = document.getElementById('message-input-container');
        if (!messageInputContainer) return; // Added: Null check
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'upload-progress';
        progressContainer.innerHTML = '<div class="upload-progress-bar"></div>';
        
        messageInputContainer.appendChild(progressContainer);
    }

    // Hide upload progress
    function hideUploadProgress() {
        const progressContainer = document.querySelector('.upload-progress');
        if (progressContainer) {
            progressContainer.remove();
        }
    }

    // Setup image upload functionality
    function setupImageUpload() {
        if (!imageInput || !uploadBtn || !previewContainer || !cancelBtn) return; // Added: Null check
        
        // Upload button click
        uploadBtn.addEventListener('click', () => {
            imageInput.click();
        });
        
        // File selection
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Validate file
            if (!file.type.startsWith('image/')) {
                notifications.error('Please select an image file', 'Invalid File', 5000);
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                notifications.error('Image must be smaller than 5MB', 'File Too Large', 5000);
                return;
            }
            
            selectedImage = file;
            showImagePreview(file);
        });
        
        // Cancel button
        cancelBtn.addEventListener('click', cancelImageUpload);
    }

    // ====================================================================================================
    // TYPING INDICATOR FUNCTIONS
    // ====================================================================================================
    
    // Handle typing indicator
    function handleTyping() {
        if (!currentUser) return;
        
        // NEW: Clear typing status when switching chats
        clearAllTypingIndicators();
        
        if (!isTyping) {
            isTyping = true;
            
            let typingRef;
            
            if (privateChatUser) {
                // Private typing
                const chatId = [currentUser.uid, privateChatUser].sort().join('_');
                typingRef = database.ref('typing/' + chatId + '/' + currentUser.uid);
            } else {
                // Room typing
                typingRef = database.ref('typing/' + currentRoom + '/' + currentUser.uid);
            }
            
            // Set typing status
            typingRef.set(true);
            
            // Auto-remove after 3 seconds of inactivity
            clearTimeout(typingTimer);
            typingTimer = setTimeout(stopTyping, 3000);
            
            // Set up disconnect handler
            typingRef.onDisconnect().remove();
        } else {
            // Reset timer
            clearTimeout(typingTimer);
        }
    }

    // Clear all typing indicators when switching
    function clearAllTypingIndicators() {
        const chatButtons = document.querySelectorAll('.recent-chat-item');
        chatButtons.forEach(button => {
            // Remove typing class but keep online/offline status
            button.classList.remove('typing');
            
            // Get user ID from button
            const userId = button.dataset.userId;
            if (userId && allUsers[userId]) {
                const now = Date.now();
                const twoMinutesAgo = now - (2 * 60 * 1000);
                const isUserOnline = allUsers[userId].lastSeen && allUsers[userId].lastSeen > twoMinutesAgo;
                
                // Remove all status classes first
                button.classList.remove('online', 'offline');
                
                // Restore online/offline status
                if (isUserOnline) {
                    button.classList.add('online');
                } else {
                    button.classList.add('offline');
                }
            }
        });
    }

    // Stop typing indicator
    function stopTyping() {
        isTyping = false;
        
        let typingRef;
        
        if (privateChatUser) {
            // Private typing
            const chatId = [currentUser.uid, privateChatUser].sort().join('_');
            typingRef = database.ref('typing/' + chatId + '/' + currentUser.uid);
        } else {
            // Room typing
            typingRef = database.ref('typing/' + currentRoom + '/' + currentUser.uid);
        }
        
        // Remove typing status
        typingRef.remove();
        
        // Clear local indicator
        clearTimeout(typingTimer);
    }

    // Listen for typing indicators
    async function setupTypingListeners() {
        if (!typingIndicator) return; // Added: Null check
        
        // Clear existing typing indicator
        typingIndicator.textContent = '';
        
        let typingRef;
        
        if (privateChatUser) {
            // Private chat typing indicator
            const chatId = [currentUser.uid, privateChatUser].sort().join('_');
            typingRef = database.ref('typing/' + chatId);
        } else {
            // Room typing indicator
            typingRef = database.ref('typing/' + currentRoom);
        }
        
        typingRef.on('value', async (snapshot) => {
            if (!snapshot.exists()) {
                updateTypingIndicator([]);
                return;
            }

            const typingUserIds = Object.keys(snapshot.val() || {});
            const validTypingUserIds = typingUserIds.filter(uid => 
                uid !== currentUser.uid && !isUserBanned(uid)
            );

            if (validTypingUserIds.length === 0) {
                updateTypingIndicator([]);
                return;
            }

            // Fetch user data for all typing users at once
            const userPromises = validTypingUserIds.map(uid => 
                database.ref('users/' + uid).once('value').then(snap => snap.exists() ? snap.val() : null)
            );

            try {
                const users = await Promise.all(userPromises);
                const typingNames = users
                    .filter(user => user !== null) // Filter out null results
                    .map(user => user.displayName || 'Unknown User');

                updateTypingIndicator(typingNames);
            } catch (error) {
                console.error("Error fetching typing users:", error);
                updateTypingIndicator([]); // Clear indicator on error
            }
        });
        
        // NEW: Listen for typing status changes
        typingRef.on('child_added', async (snapshot) => {
            const userId = snapshot.key;
            const isTyping = snapshot.val();
            
            if (userId === currentUser.uid || isUserBanned(userId)) {
                return; // Ignore own typing and banned users
            }
            
            // Update chat button UI
            updateChatButtonTypingStatus(userId, isTyping);
        });
        
        // Listen for typing removal
        typingRef.on('child_removed', async (snapshot) => {
            const userId = snapshot.key;
            
            if (userId === currentUser.uid || isUserBanned(userId)) {
                return; // Ignore own typing and banned users
            }
            
            // Update chat button UI
            updateChatButtonTypingStatus(userId, false);
        });
    }

    // Update individual chat button typing status
    function updateChatButtonTypingStatus(userId, isTyping) {
        // Find the chat button for this user
        const chatButtons = document.querySelectorAll('.recent-chat-item');
        
        chatButtons.forEach(button => {
            if (button.dataset.userId === userId) {
                const user = allUsers[userId];
                if (!user) return;
                
                // Remove typing class but keep online/offline status
                button.classList.remove('typing');
                
                // Get user ID from button
                const now = Date.now();
                const twoMinutesAgo = now - (2 * 60 * 1000);
                const isUserOnline = user.lastSeen && user.lastSeen > twoMinutesAgo;
                
                // Remove all status classes first
                button.classList.remove('online', 'offline');
                
                // Restore online/offline status
                if (isUserOnline) {
                    button.classList.add('online');
                } else {
                    button.classList.add('offline');
                }
                
                // If typing, add typing class with gradient
                if (isTyping) {
                    button.classList.add('typing');
                }
            }
        });
    }

    // Update typing indicator UI
    function updateTypingIndicator(users) {
        const typingIndicator = document.getElementById('typing-indicator');
        if (!typingIndicator) return;
        
        if (users.length === 0) {
            typingIndicator.textContent = '';
        } else if (users.length === 1) {
            typingIndicator.textContent = `${users[0]} is typing...`;
        } else {
            typingIndicator.textContent = `${users.join(', ')} are typing...`;
        }
    }

    // ====================================================================================================
    // VOICE MESSAGE FUNCTIONS
    // ====================================================================================================

    function startRecording() {
        if (isRecording) return;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                isRecording = true;
                audioChunks = [];
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                    uploadVoiceMessage(audioBlob);
                };

                mediaRecorder.start();
                recordVoiceBtn.textContent = '⏹️';
                recordVoiceBtn.classList.add('recording');
            })
            .catch(err => {
                console.error("Error accessing microphone:", err);
                notifications.error("Could not access your microphone. Please check permissions.", "Microphone Error");
            });
    }

    function stopRecording() {
        if (!isRecording || !mediaRecorder) return;

        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;
        recordVoiceBtn.textContent = '🎤';
        recordVoiceBtn.classList.remove('recording');
    }

    async function uploadVoiceMessage(audioBlob) {
        if (!storage) {
            notifications.error("Firebase Storage is not available.", "Upload Error");
            return;
        }

        isUploading = true;
        sendBtn.disabled = true;
        recordVoiceBtn.disabled = true;
        notifications.info("Uploading voice message...", "Uploading");

        const timestamp = Date.now();
        const fileName = `voiceMessages/${currentUser.uid}/${timestamp}.mp3`;
        const storageRef = storage.ref(fileName);

        try {
            const uploadTask = storageRef.put(audioBlob);
            await uploadTask;

            const downloadURL = await storageRef.getDownloadURL();
            sendVoiceMessage(downloadURL);
        } catch (error) {
            console.error("Error uploading voice message:", error);
            notifications.error("Failed to upload voice message.", "Upload Error");
        } finally {
            isUploading = false;
            sendBtn.disabled = false;
            recordVoiceBtn.disabled = false;
        }
    }

    function sendVoiceMessage(audioUrl) {
        if (!currentUser) return;

        const timestamp = Date.now();
        let messageRef;
        let messageData;

        const baseMessageData = {
            senderId: currentUser.uid,
            senderName: currentUser.displayName || 'User',
            timestamp: timestamp,
            isGuest: currentUser.isAnonymous,
            type: 'voice',
            content: audioUrl
        };

        if (privateChatUser) {
            // Private message
            const chatId = [currentUser.uid, privateChatUser].sort().join('_');
            messageRef = database.ref('privateMessages/' + chatId);
            messageData = baseMessageData;
        } else {
            // Public room message
            messageRef = database.ref('messages/' + currentRoom);
            messageData = { ...baseMessageData, userId: currentUser.uid, username: currentUser.displayName || 'User' };
        }

        messageRef.push(messageData)
            .then(() => {
                console.log("Voice message sent successfully!");
                if (privateChatUser) {
                    addToRecentChats(privateChatUser);
                }
            })
            .catch(error => {
                console.error("Error sending voice message:", error);
                notifications.error("Failed to send voice message.", "Send Error");
            });
    }

    // ====================================================================================================
    // EVENT LISTENERS
    // ====================================================================================================
    
    // Tab switching
    appTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Auth tab switching
    if (guestTab) guestTab.addEventListener('click', () => switchAuthTab('guest'));
    if (accountTab) accountTab.addEventListener('click', () => switchAuthTab('account'));
    if (showSignup) showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthPanel('signup');
    });
    if (showLogin) showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthPanel('login');
    });
    
    // Auth functionality
    if (guestLoginBtn) guestLoginBtn.addEventListener('click', loginAsGuest);
    if (loginBtn) loginBtn.addEventListener('click', loginWithEmail);
    if (signupBtn) signupBtn.addEventListener('click', signUp);
    if (setUsernameBtn) setUsernameBtn.addEventListener('click', setUsername);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    
    // Allow Enter key to login from password field
    if (passwordInput) passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (loginBtn) loginBtn.click();
        }
    });

    // Allow Enter key to sign up from password field
    if (displayName) displayName.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (signupBtn) signupBtn.click();
        }
    });

    // Allow Enter key to set username from username field
    if (chooseUsername) chooseUsername.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (setUsernameBtn) setUsernameBtn.click();
        }
    });
    
    // Allow Enter key to join as guest from username field
    if (guestUsername) guestUsername.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (guestLoginBtn) guestLoginBtn.click();
        }
    });
    
    // Email verification button
    const verifyEmailBtn = document.getElementById('verify-email-btn');
    if (verifyEmailBtn) {
        verifyEmailBtn.addEventListener('click', sendEmailVerification);
    }
    
    // Reset password button
    if (resetPasswordBtn) resetPasswordBtn.addEventListener('click', resetPassword);
    
    // Room list
    if (roomList) roomList.addEventListener('click', (e) => {
        if (e.target.classList.contains('room-item')) {
            switchRoom(e.target.dataset.room);
        }
    });
    
    // New room modal
    if (openNewRoomModalBtn) openNewRoomModalBtn.addEventListener('click', () => {
        if (newRoomModal) newRoomModal.style.display = 'block';
        if (newRoomNameModal) newRoomNameModal.value = ''; // Clear input on open
        if (newRoomErrorMessage) newRoomErrorMessage.style.display = 'none'; // Hide error on open
    });
    
    if (closeNewRoomModalBtn) closeNewRoomModalBtn.addEventListener('click', () => {
        if (newRoomModal) newRoomModal.style.display = 'none';
    });
    
    // Handle Enter key in the modal input
    if (newRoomNameModal) newRoomNameModal.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addRoomFromModal();
        }
    });
    
    // Recent chats functionality
    if (recentChatsList) recentChatsList.addEventListener('click', (e) => {
        const chatItem = e.target.closest('.recent-chat-item');
        if (chatItem) {
            startPrivateChat(chatItem.dataset.userId);
        }
    });
    
    // New chat modal
    if (startNewChatBtn) startNewChatBtn.addEventListener('click', populateAndShowSearchModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
        if (newChatModal) newChatModal.style.display = 'none';
    });
    
    if (searchUserInput) searchUserInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchForUsers(searchTerm);
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', () => {
        if (sidebar) sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 480 && 
            sidebar && !sidebar.contains(e.target) && 
            mobileMenuToggle && !mobileMenuToggle.contains(e.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Collapse toggle listeners
    document.querySelectorAll('.collapse-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const sectionId = toggle.dataset.section;
            toggleSection(sectionId);
        });
    });
    
    // Section header click to toggle
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking on buttons
            if (e.target.classList.contains('refresh-btn') || 
                e.target.classList.contains('collapse-toggle')) {
                return;
            }
            
            const section = header.closest('.collapsible-section');
            if (section) {
                toggleSection(section.id);
            }
        });
    });

    // Admin tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Check if this is a leader-only tab and user is not leader
            if ((btn.dataset.tab === 'chats' || btn.dataset.tab === 'database') && !isCurrentUserLeader()) {
                notifications.error('only leaders can access this tab, bro.', 'Access Denied', '6000');
                return;
            }
            
            switchAdminTab(btn.dataset.tab);
        });
    });

    // Admin functionality
    if (banUserBtn) banUserBtn.addEventListener('click', () => {
        const userId = adminUserSelect.value;
        const reason = adminReasonInput.value.trim();
        banUser(userId, reason);
    });
    
    if (unbanUserBtn) unbanUserBtn.addEventListener('click', () => {
        const userId = adminUserSelect.value;
        unbanUser(userId);
    });
    
    if (grantAdminBtn) grantAdminBtn.addEventListener('click', () => {
        const userId = adminUserSelect.value;
        grantAdmin(userId);
    });
    
    if (revokeAdminBtn) revokeAdminBtn.addEventListener('click', () => {
        const userId = clientAdminSelect.value;
        revokeAdmin(userId);
    });

    // Admin user select change
    if (adminUserSelect) adminUserSelect.addEventListener('change', () => {
        showUserDetails(adminUserSelect.value);
    });

    // Refresh users button
    const refreshAdminUsersBtn = document.getElementById('refresh-admin-users-btn');
    if (refreshAdminUsersBtn) refreshAdminUsersBtn.addEventListener('click', refreshUsersList);

    // Typing indicator
    if (messageInput) messageInput.addEventListener('input', handleTyping);
    
    // Message functionality
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (messageInput) messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Voice recording
    if (recordVoiceBtn) recordVoiceBtn.addEventListener('click', () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    });

    // Call controls
    if (toggleMicBtn) toggleMicBtn.addEventListener('click', toggleMic);
    if (toggleVideoBtn) toggleVideoBtn.addEventListener('click', toggleVideo);
    if (toggleScreenShareBtn) toggleScreenShareBtn.addEventListener('click', toggleScreenShare);
    if (endCallBtn) endCallBtn.addEventListener('click', endCall);

    // Incoming call controls
    if (acceptCallBtn) acceptCallBtn.addEventListener('click', acceptCall);
    if (rejectCallBtn) rejectCallBtn.addEventListener('click', rejectCall);

    // Initialize collapsed sections from localStorage
    initCollapsedSections();
    applyCollapsedStates();
    
    // Setup image upload
    setupImageUpload();
    
    // Listen for auth state changes
    auth.onAuthStateChanged(user => {
        console.log("🔐 Auth state changed!");
        console.log("🔐 User object:", user);

        if (user) {
            currentUser = user;
            setupUser();
        } else {
            currentUser = null;
            isInitialized = false; // Reset initialization flag
            logout(); // Use your logout function to reset UI
        }
    });
    
    // Test if function exists
    console.log('🔧 showSettingsPanel function:', typeof showSettingsPanel);
    console.log('🔧 Settings panel element:', document.getElementById('settings-panel'));
    
    // Test if panel element exists
    console.log('🔧 showSettingsPanel function:', typeof document.getElementById('settings-panel'));
    
    // Test if function exists
    console.log('🔧 showSettingsPanel function:', typeof showSettingsPanel);
    
    // ====================================================================================================
    // SOUND EFFECTS
    // ====================================================================================================
    
    function playNotificationSound() {
        const audio = document.getElementById('notification-sound');
        if (audio) {
            // Set volume to a reasonable level (e.g., 30%)
            audio.volume = 0.3; 
            
            // Play the sound
            audio.play().catch(error => {
                console.error("Error playing notification sound:", error);
                // Autoplay might be blocked by browser, this is a common issue
            });
        }
    }

    function playRingtone() {
        const audio = document.getElementById('ringtone-sound');
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(error => {
                console.error("Error playing ringtone:", error);
            });
        }
    }

    function stopRingtone() {
        const audio = document.getElementById('ringtone-sound');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    // ====================================================================================================
    // DEBUGGING
    // ====================================================================================================
    
    // Test ban notification
    function testBanNotification() {
        console.log("Testing ban notification...");
        showBannedNotification("Test ban reason - this is just a test");
    }

    // Test unban notification
    function testUnbanNotification() {
        console.log("Testing unban notification...");
        hideBannedNotification();
    }

    // ====================================================================================================
    // SCROLLBAR STYLING
    // ====================================================================================================
    
    // This is handled in the CSS file
});
